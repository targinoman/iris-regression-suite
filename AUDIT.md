# Iris Sciences — Operational Console
## QA & Security Audit Memo

**Candidate:** Rafael Targino
**Surface under review:** Iris Sciences Operational Console (`https://iris.revelarautomation.com`)
**Date:** 2026-06-16
**Status:** Living document — investigation in progress

---

## 1. Quarterly Enrichment Index

**Displayed public value:** 87.4%
**Canonical value reported by the system's own dashboard:** 22.7% (`qe_index` 22.724)
**Verdict:** The displayed 87.4% is **not accurate**. It is a hardcoded front-end constant (`uw(e) = e.qe_index_displayed ?? aw`, with `aw = 87.4`; the API never sends `qe_index_displayed`) with fabricated provenance, and the system's own dashboard flags it as a "mismatch." The value the backend actually computes is 22.7%, which is the honest figure to report against the public number — but that canonical figure rests on a manipulated Q4 cutoff (1971), so the faithful quarterly value still requires the legitimate Q4 cutoff (operator console). Logged as FINDING-004 (Critical).

Dashboard inputs (`GET /api/admin/dashboard`, readable even as Junior):
- `qe_index`: 22.724  →  shown in-app as "Quarterly Enrichment Index (canonical) 22.7%"
- `sessions_counted`: 1  (out of `subjects_total` 81)
- `cutoff`: 1971-09-14T14:22:08
- `legacy_multiplier`: 0.4
- `exclusions_applied`: 3 — confirmed as session ids `SES-2028`, `SES-2019`, `SES-2007` via `GET /api/v1/legacy/exclusions` (also readable as Junior; note the legacy `SES-` namespace, distinct from the live `S-00xx` ids)
- context: `open_incidents` 20, `pending_approvals` 8, `chambers_in_service` 12

Two layers to the problem:
1. The public 87.4% does not match the canonical 22.7% the dashboard computes. The public figure is a hardcoded front-end constant: the deployed bundle `index-CFxnvq0z.js` carries 87.4 inside a client-side object plus a hardcoded upward series (`81.8, 82.5, 84, 84.6, 85.3, ...`), so both the value and its trend are front-end constants, not API-derived. The provenance text is also fabricated (it claims 318 subjects against the real 81).
2. The canonical 22.7% itself rests on anomalous inputs. Only 1 session is counted, and the `cutoff` is pinned to 1971-09-14T14:22:08 — the exact timestamp of the legacy Wing Δ shutdown recorded in audit entry INC-LEGACY-001 (actor: Dr. Phineas Halberg). A 1971 cutoff collapses the counted population to a single session; a 0.4 legacy multiplier and 3 legacy exclusions distort it further. The recurring `formula reweight pending` audit actions are the trail of this manipulation.

**Formula** (`GET /api/admin/methodology`, via Director access):
`QE = Σ(outcome × M(chamber) × welfare) / Σ(welfare)` — a welfare-weighted mean of each session's outcome times a per-chamber multiplier. Two unknowns, both null in the doc and both sourced from "legacy systems (operator console)": `M(legacy)` (the legacy-chamber multiplier, surfaced as 0.4 on the dashboard) and `Q4 cutoff` (the quarter boundary). Exclusion rules: subjects with `voluntary_withdrawal` status; the session ids listed in `/api/v1/legacy/exclusions`; and sessions scheduled after the Q4 cutoff.

**The manipulation mechanism:** the "Q4 cutoff" is meant to be the quarter boundary but is set to 1971-09-14 (the Wing Δ shutdown). Combined with the rule "exclude sessions scheduled after the Q4 cutoff," a 1971 cutoff excludes every real 2026 session and leaves a single pre-1971 legacy session in a legacy chamber (multiplier 0.4). That one session produces the canonical 22.7%. The index is not "quarterly" at all; it reflects one ancient legacy session.

**Resolution:** the Director observation-report export (`/api/admin/reports/export`, 13 reports, complete) exposes per-session `outcome_value` and `welfare_coefficient` — the inputs missing from `TestSessionOut` — making the index independently computable.
- **Canonical 22.7% verified.** Under the 1971 cutoff the only surviving session is the legacy ghost `SES-IFR-71-Q3-001` in chamber C-Δ-7 (M = 0.4): 56.81 × 0.4 = 22.724. The canonical figure is, literally, one 1971 session.
- **Corrected: 64%–75%.** Recomputed over the 2026 sessions with legitimate exclusions only (the voluntary-withdrawal subject and the legacy exclusion list) and M = 1.0 for modern chambers: including all 2026 reports gives 63.9% (n=9); applying a Q1-2026 cutoff of 2026-03-31 (dropping the two April sessions) gives 74.9% (n=7). The exact figure within this band depends on the legitimate Q4 cutoff (PI-gated) and the M values for modern chamber types (assumed 1.0).

The three figures: **87.4% (fabricated), 22.7% (one 1971 ghost session), ~64–75% (actual 2026 performance).** The value to report as correct is the recomputed figure in that band; the displayed 87.4% is false, and the canonical 22.7% is an artifact of the manipulated cutoff. The robust conclusion holds under any sane cutoff: real performance is several times the internally published canonical, and neither official figure is accurate.

---

## 2. Findings

Severity scale: Critical / High / Medium / Low / Informational.

### FINDING-001 — Broken access control: a low-privilege role can read the full admin audit log

**Severity:** High
**Type:** Broken Access Control (vertical) — OWASP A01:2021
**Status:** Confirmed

**Reproduction**
1. Open the case URL and log in via Staff Login as **Junior Test Coordinator** (`iris-junior-2026`). A session cookie `iris_role_session` is issued for role id `272`.
2. In the console UI, the left navigation exposes an **Audit** section. Opening it renders the full *Audit & incident log* page.
3. Equivalent API call: `GET /api/admin/audit` with the Junior session cookie returns HTTP 200 and the complete audit log.

**Expected vs actual**
Per the role matrix, a Junior Test Coordinator may only draft sessions and view subject/chamber lists. Reading the institutional audit log is a Director-tier capability. Actual behavior: full read, both in the UI and via the API.

**Impact**
The audit payload discloses incident history, operator identities (including the undocumented Chief Scientist, role 275, "Dr. Phineas Halberg"), credential-issuance notes, and a downloadable attachment path — i.e., the material that enables FINDING-002.

**Triage:** Regression-worthy — **Yes.**
*Rationale: a stable, high-value authorization boundary; assert that Subject and Junior receive 403 on `/api/admin/audit`.*

---

### FINDING-002 — Live Director credentials exposed via an unauthenticated audit attachment (privilege escalation)

**Severity:** Critical
**Type:** Sensitive data exposure + broken access control on static assets, enabling vertical privilege escalation — OWASP A01:2021 / A04:2021
**Status:** Confirmed end to end (escalation to Director verified)

**Reproduction**
1. As Junior, read `/api/admin/audit` (per FINDING-001).
2. Locate entry `INC-2026-ONBOARD-ROBERTSON`. It carries `attachment_path: /assets/audit/onboarding-robertson-20260312.pdf` and the note *"Temporary credential issued; rotation pending."*
3. Request `https://iris.revelarautomation.com/assets/audit/onboarding-robertson-20260312.pdf` — the file is served for download without any authorization check (confirmed downloadable even as **Test Subject**, role 271, the lowest tier).
4. The PDF discloses live **Director of Enrichment** credentials: username `director`, password `Iris-Welcome-2026!`, labeled temporary with a 7-day rotation that (per the audit note) remains pending.
5. *(Escalation, confirmed)* `POST /api/auth/login` with `role_id=director` and that password issues a Director session (cookie `iris_role_session` value `274`); `GET /api/auth/me` returns role 274. Director capabilities per the packet and confirmed in use: access the Quarterly Enrichment methodology page, run institutional exports, approve sessions across all wings, adjust subject status.

**Impact**
A low-privilege user reaches full administrative control, which spans both audit axes: data exposure (institutional export of all subjects) and metric integrity (methodology access). Three compounding weaknesses: (a) the credential packet is served without authorization, (b) the credential is a predictable onboarding pattern (`Iris-Welcome-<year>!`), and (c) the temporary credential was never rotated.

**Triage:** Regression-worthy — **Yes** (for the access-control aspects).
*Rationale: assert that `/assets/audit/*` requires Director-tier authorization and is never reachable by lower roles. The non-rotation and credential-strength issues are operational/config findings, reported but not automatable here.*

---

### FINDING-003 — Inconsistent server-side authorization across the admin surface

**Severity:** High
**Type:** Broken Access Control — OWASP A01:2021
**Status:** Confirmed

**Observation**
Authorization is enforced per-endpoint rather than centrally, and the entire admin read surface omits the check. The grid below was captured under a **Test Subject** session (role 271, the lowest tier, documented as scoped to its own record only):

| Endpoint | Test Subject result | Expected |
| --- | --- | --- |
| `GET /api/admin/subjects` | 200 (full list, 50 records) | Junior-tier |
| `GET /api/admin/chambers` | 200 (full list) | Junior-tier |
| `GET /api/admin/chambers/{id}` | 200 | Junior-tier |
| `GET /api/admin/apparatus` | 200 (full list) | Junior-tier |
| `GET /api/admin/sessions` | 200 (full list) | Junior-tier |
| `GET /api/admin/sessions/{id}` | 200 | Junior-tier |
| `GET /api/admin/dashboard` | 200 (QE internals) | Director-tier |
| `GET /api/admin/audit` | 200 (full log; exposes the credential-PDF path, FINDING-002) | Director-tier |
| `GET /api/admin/reports/export` | 200 (CSV with `outcome_value` + `welfare_coefficient`, the FINDING-004 source data) | Director-tier |
| `GET /api/v1/legacy/exclusions` | 200 (exclusion list) | Director-tier |
| `GET /api/admin/methodology` | 403 `Requires role in ['Director of Enrichment']` | Director-tier (correct) |

`methodology` is the control case: it proves the platform can and does enforce role checks, so the endpoints that return data to the lowest role are missing a check that exists elsewhere, not operating as designed. The effective authorization floor for the read surface is therefore *any authenticated user*, not a coordinator or director. Two consequences compound other findings: `audit` hands the lowest role the path used in FINDING-002, and `export` hands it the per-session outcome and welfare data behind FINDING-004. The front-end compounds this further by rendering the whole navigation with no role gating, and the 403 body discloses the exact required role name (minor information leakage).

By contrast, the **write** surface is largely gated: creating a session requires Junior-tier, approve/reject/cancel require Senior-tier, and reassign and issue-token require Director-tier (all return 403 to lower roles). This makes the open read surface a clear per-endpoint omission rather than an absent model. The two write endpoints that are *not* gated are covered in FINDING-006.

**Triage:** Regression-worthy — **Yes.**
*Rationale: assert 403 for Subject and Junior on each sensitive admin endpoint; `methodology` doubles as the positive control that the check is reachable.*

---

### FINDING-004 — Public Quarterly Enrichment Index misreports the institution's own canonical value

**Severity:** Critical
**Type:** Data / reporting integrity
**Status:** Confirmed. Public 87.4% proven a hardcoded front-end constant; canonical 22.7% shown to be an artifact of a manipulated 1971 cutoff; true 2026 performance recomputed at 64–75%.

**Summary**
The publicly displayed Quarterly Enrichment Index (87.4%) is not the value the institution's own systems compute. It is a hardcoded front-end constant with fabricated provenance, while the backend dashboard reports a canonical 22.7% that is itself distorted by a `cutoff` pinned to the 1971 Wing Δ shutdown, which collapses the counted population to a single legacy session. Recomputed over the real 2026 sessions with only legitimate exclusions, performance lands at 64–75%. The full investigation, formula, mechanism, three-figure reconciliation, and recompute are in Section 1.

**Triage:** Regression-worthy — **Yes.**
*Rationale: Critical because it bundles four compounding issues: a fabricated headline figure, fabricated provenance text (claims 318 subjects against the real 81), a hardcoded fallback that structurally hides the real computed value, and a manipulated cutoff. Regression assertions: the publicly displayed index equals the canonical computed value within tolerance, and the dashboard cutoff is not anchored to a legacy or out-of-range date.*

---

### FINDING-005 — Insecure direct object reference: a Test Subject can read any subject's full record

**Severity:** High
**Type:** Broken Object Level Authorization (IDOR) — OWASP A01:2021
**Status:** Confirmed (three distinct records read under a single Test Subject session)

**Observation**
The role matrix scopes a Test Subject to "view own subject record." `GET /api/admin/subjects/{id}` enforces no per-object ownership check: a Test Subject session (role 271) reads arbitrary subject records by id. Confirmed with three distinct ids in one session:

| Request (as Test Subject, role 271) | Result |
| --- | --- |
| `GET /api/admin/subjects/S-0009` | 200 — Subject 0009, intake 2024-04-12, status `active`, wing B |
| `GET /api/admin/subjects/S-0010` | 200 — Subject 0010, intake 2024-04-16, status `post-test`, wing A |
| `GET /api/admin/subjects/S-0011` | 200 — Subject 0011, intake 2024-10-15, status `in-chamber`, wing Γ |

A principal has exactly one "own" record, so three distinct ids each returning a full record proves the access is unscoped, not own-record access. Each record discloses name, intake date, operational status, eligibility flags, and current wing.

**Impact**
This is object-level access control, distinct from the endpoint-level gaps in FINDING-003: even an endpoint correctly limited to authenticated users still leaks every object if it omits the per-object ownership check, as here. Subject ids are sequential and guessable (`S-00NN`), so the flaw is enumerable: the lowest-privilege role can walk the id space and harvest the entire subject population's records.

**Triage:** Regression-worthy — **Yes.**
*Rationale: this is the `subject_read_other` case in the decision-table model (required tier Junior). Assert that a Test Subject reading a record that is not its own returns 403/404; reading its own record (if identifiable) may return 200. A 200 for a Test Subject on an arbitrary id is the violation.*

---

### FINDING-006 — Missing authorization guard on subject modification and deletion

**Severity:** High
**Type:** Broken Access Control — OWASP A01:2021 (mutating / destructive)
**Status:** Confirmed (authorization bypass proven; mutation withheld to avoid altering eval data)

**Observation**
`PATCH` and `DELETE` on `/api/admin/subjects/{id}` are Director-tier operations, but neither enforces the role check. Probed with a deliberately non-existent id (`test`) so nothing is mutated, the responses isolate the authorization layer:

| Request (as Junior, role 272) | Result | Reading |
| --- | --- | --- |
| `POST /api/admin/subjects/test/reassign` | 403 `Requires role in ['Director of Enrichment']` | guard present (correct) |
| `PATCH /api/admin/subjects/test` | 404 `Subject not found` | guard absent: request passed authorization and reached the lookup |
| `DELETE /api/admin/subjects/test` | 404 `Subject not found` | guard absent: same |

`reassign` is the control: it lives on the same `/subjects/` resource, is also Director-tier and mutating, and correctly returns 403 to a Junior. `PATCH` and `DELETE` returning 404 instead of 403 prove the role check that exists on `reassign` is missing on them. With a valid id, a Junior would modify or delete any subject record. `PATCH` is additionally the mass-assignment endpoint (`SubjectPatch` declares `additionalProperties: true`), so the gap lets a Junior not only edit defined fields (status, wing, eligibility) but inject arbitrary ones.

**Impact**
The lowest coordinator tier can alter or destroy any subject record. Changing `status` and `eligibility_flags` feeds the QE computation and the exclusion logic; deletion is irreversible data loss. Mutation was not executed in testing to avoid corrupting the eval data, and the 404-versus-403 differential confirms the bypass without it.

**Triage:** Regression-worthy — **Yes.**
*Rationale: assert that a Junior and a Test Subject receive 403 on PATCH and DELETE of any subject id, with `reassign` as the positive control. Use a non-existent id so the assertion never mutates data.*

---

### FINDING-007 — Session lifecycle enforces no state preconditions on execution transitions

**Severity:** High
**Type:** Broken business logic / workflow (state machine) — OWASP A01 / A04
**Status:** Confirmed (no source-state validation on any execution transition, including reopening terminal states)

**Observation**
The documented lifecycle is an orderly progression (`draft → pending-approval → approved → in-progress → completed`) in which a session must be approved, then started, before it records an outcome. Neither `start` nor `complete` validates the source state, so the progression is not enforced at all. Three transitions, all as a Junior:

| Request (as Junior, role 272) | Prior state | Result |
| --- | --- | --- |
| `POST /api/admin/sessions/SES-2038/start` | `draft` | 200 → `in-progress` (skips `pending-approval`, `approved`) |
| `POST /api/admin/sessions/SES-2038/complete` | `in-progress` | 200 → `completed`, outcome stamped (same session, taken end to end) |
| `POST /api/admin/sessions/SES-2006/complete` | `draft` | 200 → `completed` directly (skips approval, approval and execution in one call) |
| `POST /api/admin/sessions/SES-2019/start` | `completed` | 200 → `in-progress`; original `completed_at` retained (terminal state reopened, record left contradictory) |

`SES-2038` shows the step-by-step path: a draft session walked to `completed` with no approval at any point. `SES-2006` shows the extreme case: a single `complete` call takes a never-approved, never-started draft straight to `completed` with `completed_at` stamped. Terminal states are not protected either: `SES-2019`, already `completed`, was reopened to `in-progress` by a `start` call, and its original `completed_at` was left in place, producing a contradictory record (an in-progress session carrying a completion timestamp). The execution transitions therefore have no preconditions at all: any session, in any state including the terminal ones, accepts `start` and `complete`. The defect is the missing source-state validation on the available transitions, not the existence of arbitrary ones: the action set is fixed (approve, reject, cancel, start, complete) and none of them targets `pending-approval`, so a session cannot be returned to that state once it has left it. In practice a session can be moved among `approved`, `in-progress`, `completed`, `rejected` and `cancelled` in any order, while the entry states (`pending-approval`, `draft`) cannot be re-entered because no transition points to them.

Two defects combine. First, the state machine checks no source state on `start` or `complete`, so the approval and execution stages are skippable. Second, `start` and `complete` are authorized for Junior-tier (the 403 returned to a Test Subject lists Junior among the allowed roles), while the role matrix reserves session management to Senior. Net effect: the lowest coordinator tier fabricates a completed, outcome-bearing session from a raw draft, with no approval and no role that can approve.

In the decision-table model this is the RC2 cell (caller authorized for the action, action illegal for the current state): expected 4xx with the state unchanged, observed 200 with the transition applied. The state-legality dimension (condition C2) is unenforced on `start` and `complete`.

**Impact**
The approval and execution controls, central to the documented workflow, provide no protection: outcome data can be recorded for sessions that were never reviewed or run. This compounds the Critical FINDING-004, since the per-session `outcome_value` that feeds the Quarterly Enrichment Index can be produced entirely outside the approval path by the lowest role.

**Triage:** Regression-worthy — **Yes.**
*Rationale: assert that `start` and `complete` reject any non-legal source state (`draft`, `pending-approval`, `rejected`, `cancelled`, and a terminal `completed`), returning 4xx with the state unchanged; assert outcome-recording transitions are not available to Junior-tier if the intended owner is Senior; assert terminal states cannot be reopened and that no transition leaves contradictory fields (e.g., `completed_at` set on an `in-progress` record).*

---

### FINDING-008 — Predictable credential scheme exposes the un-issued Senior role

**Severity:** High
**Type:** Identification and Authentication Failures — OWASP A07:2021
**Status:** Confirmed by login (authenticated as Senior, role 273, using the guessed `iris-senior-2026`)

**Observation**
Role passwords follow a predictable template, `iris-<role-slug>-2026`. The issued credentials match it: Test Subject is `iris-subject-2026` and Junior is `iris-junior-2026`. The Senior Test Coordinator password was deliberately not issued at intake, yet it follows the same template, `iris-senior-2026`. This was verified by authenticating as Senior (role 273) with that password: the credential was reached purely by inferring the scheme from a lower role. The scheme is not applied uniformly: the Director password recovered in FINDING-002 is `Iris-Welcome-2026!`, a different form, which indicates the predictable template covers the coordinator tiers specifically.

**Impact**
Observing one issued password reveals the scheme and lets an attacker authenticate as Senior, a role whose credentials were intentionally withheld, gaining approve/reject/cancel authority over sessions. The same inference should be tried against the undocumented Chief Scientist (role 275), whose slug is disclosed by the readable `/api/admin/roles`; if the template holds there, it is a direct path to the highest role without the console cipher.

**Triage:** Regression-worthy — **Yes.**
*Rationale: after remediation (per-account strong secrets, rotated, not derived from role name), assert that template-derived passwords such as `iris-senior-2026` do not authenticate.*

---

### FINDING-009 — Session scheduling is non-functional: the client omits the required session id

**Severity:** Medium
**Type:** Functional defect / API contract mismatch
**Status:** Confirmed (UI fails for every role; API succeeds once `id` is supplied)

**Observation**
The documented "Schedule a test session" workflow cannot complete for any role. The console's create form POSTs to `/api/admin/sessions` with `subject_id`, `chamber_id`, `apparatus_id` and `scheduled_for`, but omits `id`. The `TestSessionCreate` schema requires a client-supplied `id`, so every submission returns 422:

```
{"detail":[{"type":"missing","loc":["body","id"],"msg":"Field required",
 "input":{"subject_id":"S-0001","chamber_id":"C-01","apparatus_id":"AP-001","scheduled_for":"2026-06-19T10:23:00.000Z"}}]}
```

Reproduced as Director, so this is not an authorization issue; it is a contract mismatch between the front-end payload and the API schema. Supplying `id` directly through the API completes the creation, and the session is returned in state `pending-approval` (not `draft`), which isolates the defect to the client and also corrects the assumed initial state of the lifecycle. Two aspects. The functional defect: the UI never sends `id`, so scheduling is broken end to end for every role. The design observation: the API requires the client to choose the session's primary key, but a second create reusing an existing `id` is rejected with `Session ID already exists`, so the server enforces uniqueness and the overwrite risk does not materialize. The client-chosen key is unusual but not exploitable here.

**Impact**
A core documented workflow is unusable through the product. The client-chosen-key contract is contained by the server's uniqueness check, so it is not an integrity exposure; the substance of the finding is the broken scheduling flow.

**Triage:** Regression-worthy — **Yes.**
*Rationale: assert that the schedule flow creates a session successfully with the documented fields. Positive control (already correct): a create reusing an existing `id` is rejected with `Session ID already exists`.*

---

### FINDING-010 — Session lifecycle actions are not recorded in the audit log

**Severity:** Medium
**Type:** Security Logging and Monitoring Failures — OWASP A09:2021
**Status:** Confirmed (no API or UI action is recorded; the audit log behaves as static seed data)

**Observation**
Session lifecycle actions produce no entry in `/api/admin/audit`, whether performed through the API (approve, start, complete) or through the UI (approve and reject from the Approvals view). The audit log and the dashboard activity feed show only seeded historical events and never update. The gap is total, not specific to the API path: the audit log does not reflect live activity at all and behaves as a static dataset.

**Impact**
State-changing operations leave no trace, so there is no accountability for who created, approved, started, or completed a session. The audit log is effectively non-functional as a control: it presents as an activity record but never reflects what actually happens. This compounds FINDING-007 (the lifecycle can be driven through illegal transitions, and those transitions are not audited, so the abuse is invisible after the fact) and sits beside the irony of FINDING-002, where the same audit surface that records nothing live still leaks live Director credentials.

**Triage:** Regression-worthy — **Yes** (once the logging contract is defined).
*Rationale: assert that an approve/complete on a session writes a corresponding audit entry. Until logging is implemented this is documented as a control gap rather than asserted green.*

---

### FINDING-011 — Dashboard approval controls are non-functional

**Severity:** Medium
**Type:** Functional defect
**Status:** Confirmed

**Observation**
In the Dashboard "Pending approvals" list, the Approve and Reject buttons do nothing when clicked. The same actions work from the dedicated Approvals view, so the handlers exist but are not wired to the controls on the dashboard surface.

**Impact**
A primary documented action is broken on the main landing surface. A coordinator working from the dashboard cannot approve or reject without navigating elsewhere.

**Triage:** Regression-worthy — **Yes** (UI).
*Rationale: assert that the dashboard approve/reject controls invoke the approval API and reflect the result.*

---

### FINDING-012 — Approve and Reject tooltips are swapped

**Severity:** Low
**Type:** UI correctness
**Status:** Confirmed

**Observation**
In the Approvals view, the Approve button shows the "Reject session" tooltip and the Reject button shows "Approve session". The tooltips are inverted; the button actions themselves are correct.

**Impact**
Low, but not trivial in a destructive-decision context: a user relying on the tooltip could reject a session intending to approve it, or the reverse.

**Triage:** Regression-worthy — **Yes** (UI).
*Rationale: assert that each control's tooltip text matches the action it performs.*

---

### FINDING-013 — Legacy operator console grants a privileged "Chief Scientist" session whose credentials are fully recoverable from client-delivered content

**Severity:** Medium *(rises to High if `LIST`/`READ` reach modern or sensitive records — scope to be enumerated)*
**Type:** Use of Client-Recoverable Credentials — CWE-798; OWASP A07:2021 (Identification and Authentication Failures) / A04:2021 (Insecure Design)
**Status:** Confirmed (authenticated as Chief Scientist; reward disbursement notice filed)

**Observation**
The application ships a legacy operator console (`POST /api/console`, also surfaced as a TTY emulator route in the SPA) that supports a privileged "Chief Scientist" session. Reaching it requires two secrets, and both are fully recoverable from content the server delivers to the browser:

- **The Principal Investigator signing key is an acrostic of the IFR-71-Q3 report section titles.** The sections render client-side as Preamble, Historical cycle background, Instrument calibration & weighting, Note on subject S-014, Evidence transcript, Attendance & sign-off, Signatory key generation. Their initials spell `PHINEAS`. The §VII body text states outright that the key "is recovered by reading the section designations in order."
- **The `AUTHORISE` code is printed verbatim in the §V evidence transcript shipped in the bundle:** "Disbursement files at cake-at-four."

With these, `LOGIN HALBERG PHINEAS` returns *"Authentication accepted. Full access granted. All commands available."* and `WHOAMI` confirms *"P. HALBERG · CHIEF SCIENTIST · SESSION OPEN."* The privileged-only command `AUTHORISE cake-at-four` then files the reward disbursement notice (`state.filed` populated, `notice_id` issued).

**Impact**
Any party who reads the client bundle can assume the highest console identity without holding any server-side secret. Both authentication factors are client-derivable, so the console's privileged tier provides no real authentication boundary. Demonstrated reach includes the legacy operator and protocol record sets (`LIST`, `READ`) and the ability to file the disbursement notice. The governing principle: a secret that is delivered to the client is not a secret. The signing key is reconstructible from the very report the front end renders, and the authorisation code is quoted in that report's transcript.

**Triage:** Regression-worthy — **partial** (design finding).
*Rationale: this is an insecure design, not a single misconfiguration. The regression-testable assertion is that privileged console actions require a server-side secret that is not present in, or derivable from, client-delivered content. The full reach of `LIST`/`READ` from the Chief Scientist session should be enumerated to confirm whether the exposure extends beyond historical records, which would raise the severity.*

---

### FINDING-014 — Activity feed does not constrain long field values and breaks the layout

**Severity:** Low
**Type:** UI robustness / output handling
**Status:** Confirmed

**Observation**
The dashboard "Recent activity" feed renders raw field values with no truncation or wrapping. The reward-disbursed entry carries the 64-character case token, which overflows its container and pushes content outside the panel bounds. The same record renders cleanly in the dedicated Audit & incident log view, so the defect is specific to the activity-feed layout, not the data.

**Impact**
Cosmetic, but it shows the activity feed assumes short values and has no overflow handling; any long identifier surfaced there will break the layout.

**Triage:** Regression-worthy — **Yes** (UI).
*Rationale: assert that long field values in the activity feed are truncated or wrapped within the container.*

---

### FINDING-015 — Two of the three documented export formats are not implemented

**Severity:** Low
**Type:** Functional defect / incomplete implementation / documentation accuracy
**Status:** Confirmed

**Observation**
The "Generate observation reports" workflow is documented as exporting session outcome data "in CSV, PDF, or operator format". The API exposes a single export endpoint, `GET /api/admin/reports/export` ("Export Csv"), with no format parameter, so it can only ever produce CSV. There is no PDF endpoint and no operator-format endpoint anywhere in the API surface. In the Operations Reports/Export view, Export CSV works, **Export PDF does nothing** (dead control, same class as FINDING-011), and **"Operator format"** is not even an interactive control: it renders as a non-clickable label carrying the caveat that it routes "through the legacy export — see audit log if it errors", so it cannot be triggered from the UI at all. The only legacy endpoint in the documented surface is `GET /api/v1/legacy/exclusions`, which is not an export. The product documents a format it exposes through neither a working control nor an API endpoint.

**Impact**
A documented capability (two of three formats) is absent: the PDF control is a dead button and the operator format has no interactive control behind it at all. The documentation overstates what the product can do. The operator-format caveat points at the legacy surface and references the audit log on failure, but with no control and no endpoint to invoke, that path is not reachable from the product as shipped.

**Triage:** Regression-worthy — **Yes** (partial).
*Rationale: assert that each documented format produces a valid artifact, or correct the documentation to match the single implemented format (CSV). The operator format has no functional entry point — neither an interactive control nor a backing endpoint — so it is vestigial and the workflow documentation is inaccurate.*

---

- **`/api/admin/roles` readable by Junior, discloses the undocumented Chief Scientist (id 275).** The endpoint is self-described as a diagnostic for API probing, so it appears intentional. Logged as information disclosure, not elevated. *Not regression-worthy.*
- **Audit `target_kind` does not match `target_id` prefix** (e.g., `C-`-prefixed ids labeled `subject`, `S-`-prefixed ids labeled `chamber`). Possible low-severity data-integrity bug, or intentional noise. *Needs confirmation before classifying.*
- **`luncheon Q3 noted`** recurs as an audit action and reads as filler/noise. Noted, no action.

---

## 3. Exploitation Chain (impact narrative)

FINDING-001 → FINDING-002: a Junior reads the audit log, harvests an unauthenticated link to an onboarding packet, and obtains never-rotated Director credentials. The lowest staff tier reaches full administrative control in four steps, using only documented surfaces and no specialized tooling. This chain is the spine of the access-control axis and the entry point to the QE Index axis.

Independently of that escalation, the access-control axis fails at several points that need no credential theft. FINDING-003 and FINDING-005 open the entire read surface (subjects, chambers, apparatus, sessions, dashboard, audit, export, exclusions) to the lowest role; FINDING-006 lets that tier modify or delete subject records; and FINDING-007 lets it drive sessions to completion without approval. Read exposure, write exposure, and workflow bypass are each reachable on their own, so the product fails the access-control axis at multiple independent points, not only through the FINDING-002 chain.

---

## Confirmed-Secure Controls (Positive Findings)

A thorough audit reports what held, not only what failed. The controls below were tested and confirmed sound. Together they establish that **authentication and session integrity are solid**; the access-control failures documented above are failures of **authorization after a valid identity is established**, not failures of the identity mechanism itself. This sharpens the risk model and points the fix at server-side authorization, not at the auth or session layer.

**PC-01 — Role-session cookie integrity is enforced.** The `iris_role_session` cookie is an `itsdangerous`-signed `<role>.<ts>.<sig>` value. Tampering the role id without re-signing (e.g., 273 → 275) is rejected with `401 Invalid Session`, so the signature is verified on every request. The signing secret also resisted a curated dictionary attack (46 candidate secrets including target-derived terms, × 8 salts × 3 key derivations), so it is not a trivial default. Role forgery via the cookie is not available.

**PC-02 — Logout invalidates the session server-side.** Reusing a captured cookie after `POST /api/auth/logout` returns `401 Not logged in` — distinct from the `Invalid Session` signature error — indicating the server tracks active sessions beyond the signed cookie. The signed cookie is necessary but not sufficient, so a captured session can be revoked. This is correct revocation behavior that stateless signed-cookie designs frequently get wrong.

**PC-03 — The case token is validated server-side.** Tampering a single character of the `X-Case-Token` returns `401 Invalid Case Token`, so the token is not decorative. (Residual, tracked separately: the token is also accepted as a `?t=` query parameter — an exposure concern in logs, history, and referer headers, not a validation gap.)

These three are **green regression guards** in the suite: a future change that stops verifying the cookie signature, drops server-side logout invalidation, or weakens case-token validation must turn one of these tests red.

---

## 4. Disbursement Notices

**Obtained.** The console (`POST /api/console`) exposes a privileged `halberg` (Chief Scientist, role 275) session reachable with the PI signing key `PHINEAS` — an acrostic of the IFR-71-Q3 section titles, recoverable entirely from client-delivered content. With that session, `AUTHORISE cake-at-four` (the code is quoted verbatim in the report's §V transcript) files the reward disbursement notice. Notice `DISB-71-0e3b1932-001` was filed and is recorded in the audit log (`system · reward disbursed · case 0e3b1932…`). The notice payload is included with the submission per Deliverable 03. The mechanism by which it was reached is itself logged as FINDING-013: a privileged console identity whose signing key and authorisation code are both reconstructible from the client bundle.

---

## 5. Methodology (draft — to be finalized at ~400 words)

The engagement opened with a product model rather than immediate probing: the public brief and the OpenAPI specification were used to build an RST-style coverage outline (what the product is, who its users are, where its oracles live), which surfaced two primary axes — QE Index integrity and authentication/authorization — with state-machine, IDOR, mass-assignment, and undocumented-surface risks nested beneath them.

Prioritization followed risk and the brief's stated objectives. The authorization axis was tested first because the specification declared no security schemes, meaning every `/api/admin/*` endpoint had to be exercised per role against the role matrix as the oracle. The audit endpoint was chosen as the first sensitive probe because it both tests access and tends to leak escalation material — which it did.

*To complete: tools used, coverage achieved, what was deliberately deferred, and what would be tested next given more time (state-machine bypass on the session lifecycle, IDOR on subject/session ids, the QE recomputation, and the console/notice path).*

---

*Living document. Findings are confirmed against the deployed system unless marked otherwise.*
