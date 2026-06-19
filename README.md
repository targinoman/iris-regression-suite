# Iris Sciences — Regression Suite

Playwright + TypeScript regression suite for the QA & security audit of the **Iris Sciences
Operational Console**. It encodes the confirmed audit findings (`AUDIT.md`) as automated,
data-driven checks that a reviewer can run from a clean clone with their own case token.

The surface is almost entirely API (authorization, data exposure, session lifecycle); a
small browser layer covers the UI-only findings and the one public-page check.

---

## The central convention (read this first)

This suite mixes three kinds of tests on purpose. **Red is not always failure here.**

| Kind | Asserts | Expected today | Meaning of a color flip |
| --- | --- | --- | --- |
| **Security test** | the correct / secure behavior | 🔴 **red** | Each red reproduces a finding against the current vulnerable deploy. It turns 🟢 green when the fix lands. |
| **Positive control** | a guard that already works | 🟢 **green** | Proves the harness is healthy (the platform *can* enforce the check) — not a broken test. A red here is a real regression. |
| **Security regression guard** (`PC-*`) | an existing, confirmed-secure control | 🟢 **green** | The logic is *inverted* vs. the security tests: green is expected. A red means a future refactor weakened authentication/session/token enforcement. |
| **Documented gap** (`fixme` / `skip`) | nothing (no passing assertion) | ⏭️ skipped | Findings with no honest green/red oracle yet; recorded so the expectation is tracked without a fabricated pass. |

Test names carry the convention: a leading `[FINDING-00x]` is a vulnerability check (red),
`[positive control]` / `[PC-0x]` / `[CONTROL]` are green, and `fixme`/`skip` are documented gaps.

> A new security test that goes green **without the target being fixed** is a weak oracle and
> must be revised. The suite never asserts the buggy behavior just to look green.

---

## Setup

```bash
git clone https://github.com/targinoman/iris-regression-suite.git
cd iris-regression-suite
npm install
npx playwright install        # browser binaries (for the UI layer)
cp .env.example .env          # then fill it in (see below)
```

`.env` (never committed — see `.gitignore`):

| Variable | Required | Notes |
| --- | --- | --- |
| `BASE_URL` | yes | Target origin. The API lives under `${BASE_URL}/api`. |
| `CASE_TOKEN` | yes | Your reviewer case token, sent as `X-Case-Token` on every request. |
| `SUBJECT_PASSWORD` | yes | Non-sensitive (`iris-subject-2026`); ships in `.env.example`. |
| `JUNIOR_PASSWORD` | yes | Non-sensitive (`iris-junior-2026`). |
| `SENIOR_PASSWORD` | yes | Non-sensitive (`iris-senior-2026`). The predictable scheme is itself FINDING-008. |
| `DIRECTOR_PASSWORD` | optional | The FINDING-002 secret. **If blank, all Director-dependent tests skip gracefully.** |

Both `.env` and `playwright/.auth/` (saved session state — equivalent to a secret) are
gitignored. Nothing sensitive is committed.

---

## Running

```bash
npm test                                  # everything
npm run typecheck                         # tsc --noEmit (no network)
npx playwright test --list                # enumerate tests offline

# By project
npx playwright test --project=api         # request/response checks
npx playwright test --project=browser     # the UI layer + public index

# By finding / control
npx playwright test -g "FINDING-007"
npx playwright test -g "PC-0"             # the security regression guards (expected green)
npx playwright show-report               # last HTML report
```

A **`setup` project** logs in once per role and saves the signed `iris_role_session`
cookie to `playwright/.auth/<role>.json`; the `api` and `browser` projects depend on it.
Director-dependent tests `test.skip` when `DIRECTOR_PASSWORD` is unset, so the suite stays
runnable without that secret.

---

## Architecture

The coverage is **data-driven**: the audit's decision tables became case tables, and small
runners consume them. Adding coverage is adding a row, not writing new test code.

```
src/
  config.ts                 env + constants (no magic numbers / no secrets in code)
  roles.ts                  Tier scale + numeric role ids (login uses role_id)
  fixtures.ts               per-role APIRequestContext fixtures + junior/senior/directorPage (browser)
  engine/
    verdict.ts              expectedVerdict() (tier vs required) + observeVerdict() (status → barred/passed)
    authCase.ts             the Table A case contract
    httpProbe.ts            generic probe dispatch (read / write-nonexistent-id / create-invalid-body)
    lifecycle.ts            expectIllegalTransition() (state unchanged + status ∈ {400,409,422})
  data/
    authCases.ts            Decision-table A (endpoint authorization), as data
    lifecycleCases.ts       Decision-table B (illegal lifecycle transitions), as data
  api/                      service objects: AuthApi, AdminApi, SessionsApi, AssetsApi
  pages/                    page objects (browser): DashboardPage, ApprovalsPage, ReportsPage,
                            SessionsPage, PublicIndexPage
  factories/
    SessionFactory.ts       disposable REGTEST- sessions for the lifecycle tests (with teardown)
  auth/
    sessionHelpers.ts       cookie/token tampering helpers for the PC-* guards
tests/
  auth.setup.ts             setup project: login per role → storageState
  harness-health.spec.ts    [CONTROL] storageState produces an authenticated session
  authorization.spec.ts     Table A runner (FINDING-001/003/006/007-authz + controls)
  idor.spec.ts              FINDING-005
  credential-exposure.spec.ts  FINDING-002
  lifecycle.spec.ts         Table B runner (FINDING-007 preconditions)
  qe-index.spec.ts          FINDING-004 (dashboard, API)
  session-collision.spec.ts id-collision contract (API positive control)
  audit-logging.spec.ts     FINDING-010 (fixme)
  console-auth.spec.ts      FINDING-013 (skip)
  auth-integrity/           PC-01..03 security regression guards (expected green)
  ui/                       *.browser.spec.ts — the UI findings (009, 011, 012, 014, 015)
  qe-index.browser.spec.ts  FINDING-004 (public index, browser)
```

### Key design points

- **Two verdict functions.** `expectedVerdict(callerTier, requiredTier)` derives allow/deny
  from the tier table; `observeVerdict(status)` reduces a real response to `barred` (401/403),
  `passed` (200/201/409/422), or `inconclusive` (404 on a non-existent-id probe). The finding
  is the comparison `expected = deny ∧ observed = passed`.
- **Writes never mutate.** Authorization on `PATCH`/`DELETE`/`approve`/… is probed against a
  non-existent id; `POST /sessions` denial uses an invalid body. Nothing real is touched.
- **Lifecycle asserts state, not just status.** After an illegal transition the runner reads
  the state back. Primary oracle: **state unchanged**. Secondary: status ∈ `{400, 409, 422}`
  (rejected on the merits — deliberately excludes 401/403 auth and 404/405, and rejects 2xx
  no-ops). These run as an authorized caller (Director) to isolate the state dimension.
- **State factory.** Lifecycle sessions are disposable `REGTEST-<uuid>` sessions created via
  the API and cancelled on teardown; the real listing is never mutated. A session is created
  in `pending-approval` (there is no `draft` creation state and no endpoint returns to
  `pending-approval`), so unreachable source states skip rather than assert on a bad setup.
- **storageState per role.** The session is the signed `iris_role_session` cookie; one JSON
  file per role under `playwright/.auth/`.

---

## Test → finding map

Decision tables A and B mean each rule has at least one case; counts below are the rows.

| Finding | What is asserted | Where | Today |
| --- | --- | --- | --- |
| **001** Junior reads audit | Junior denied on `GET /admin/audit` | `authorization.spec.ts` | 🔴 |
| **002** Credential PDF exposure | anon & Subject get non-200 on the audit attachment | `credential-exposure.spec.ts` | 🔴 ×2 |
| **003** Open read surface | Subject/Senior denied on the admin read & Director-tier surface | `authorization.spec.ts` | 🔴 (+ 🟢 controls: `methodology`, `issue-token`, `approve/reject/cancel`, `POST /sessions`) |
| **004** QE index integrity | `cutoff` year ≥ 2000; `sessions_counted` > 1; displayed index ≈ canonical | `qe-index.spec.ts`, `qe-index.browser.spec.ts` | 🔴 ×3 (Director-dependent) |
| **005** IDOR | Subject denied/`404` reading foreign subject records | `idor.spec.ts` | 🔴 ×3 |
| **006** Missing PATCH/DELETE guard | Subject/Junior/Senior denied on `PATCH`/`DELETE` of a subject | `authorization.spec.ts` | 🔴 (+ 🟢 `reassign` control) |
| **007** Lifecycle preconditions | `start`/`complete` refused from every illegal source (state unchanged); not reachable by Junior | `lifecycle.spec.ts`, `authorization.spec.ts` | 🔴 (+ 🟢 Senior allow / Subject deny controls) |
| **008** Predictable credential scheme | the template-derived `iris-senior-2026` must not authenticate; Senior is also exercised as a full principal across Table A | `credential-scheme.spec.ts`, `authorization.spec.ts` | 🔴 (+ 🟢 Senior controls) |
| **009** Broken schedule flow | the schedule form must POST a non-empty `id` | `ui/schedule-session.browser.spec.ts` | 🔴 (as **Junior** — brief: "draft test sessions") |
| — id-collision contract | re-creating an existing id is rejected ("already exists") | `session-collision.spec.ts` | 🟢 (separate from 009) |
| **010** No lifecycle audit logging | approve/complete should append an audit entry | `audit-logging.spec.ts` | ⏭️ `fixme` (contract undefined) |
| **011** Dead dashboard approve | dashboard Approve must call the approve API | `ui/dashboard-approvals.browser.spec.ts` | 🔴 (as **Senior** — brief: "approve and manage") |
| **012** Swapped tooltips | each control's tooltip matches its action | `ui/approvals-tooltips.browser.spec.ts` | 🔴 (as **Senior** — brief: "approve and manage") |
| **013** Client-recoverable console auth | privileged console actions need a non-client-derivable secret | `console-auth.spec.ts` | ⏭️ `skip` (design gap) |
| **014** Activity feed overflow | the feed must not overflow its container | `ui/activity-feed-overflow.browser.spec.ts` | 🔴 (Director-dependent) |
| **015** Missing export formats | CSV downloads (control); PDF must export; operator format documented | `ui/reports-export.browser.spec.ts` | CSV 🟢 / PDF 🔴 / operator ⏭️ |
| **PC-01** Cookie signature enforced | tampered role (and empty/no signature) → `401 Invalid Session` | `auth-integrity/cookie-integrity.spec.ts` | 🟢 guard |
| **PC-02** Server-side logout | a cookie reused after logout → `401 Not logged in` | `auth-integrity/session-revocation.spec.ts` | 🟢 guard |
| **PC-03** Case-token validation | a tampered `X-Case-Token` → `401 Invalid Case Token` | `auth-integrity/case-token.spec.ts` | 🟢 guard |

`harness-health.spec.ts` adds `[CONTROL]` checks that the per-role storageState yields an
authenticated session — green proves the harness, not the product.
