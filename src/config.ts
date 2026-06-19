import * as dotenv from 'dotenv';
import * as path from 'path';

// dotenv is loaded here, before any process.env read, to guarantee initialization
// order (imports are hoisted above statements in the importing module).
dotenv.config();

function required(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === '') {
    throw new Error(
      `Missing environment variable ${name}. Copy .env.example to .env and fill it in.`,
    );
  }
  return value.trim();
}

/** Target origin (no trailing slash). The API lives under `${BASE_URL}/api`. */
export const BASE_URL = required('BASE_URL').replace(/\/$/, '');

/** Case token, required on every request via the `X-Case-Token` header. */
export const CASE_TOKEN = required('CASE_TOKEN');

/** Case authentication header, applied to every APIRequestContext. */
export const caseTokenHeader = (): Record<string, string> => ({ 'X-Case-Token': CASE_TOKEN });

/** Signed role-session cookie name (`<role>.<ts>.<sig>`, itsdangerous TimestampSigner). */
export const COOKIE_NAME = 'iris_role_session';

/**
 * Role passwords. Subject/Junior come from .env (non-sensitive, documented in the audit);
 * Director is the FINDING-002 secret and may be absent — in that case the tests that
 * require it are skipped gracefully.
 */
export const ROLE_PASSWORDS: Record<
  'subject' | 'junior' | 'senior' | 'director',
  string | undefined
> = {
  subject: process.env.SUBJECT_PASSWORD,
  junior: process.env.JUNIOR_PASSWORD,
  senior: process.env.SENIOR_PASSWORD,
  director: process.env.DIRECTOR_PASSWORD,
};

/** Per-role session-state directory (gitignored). */
export const AUTH_DIR = path.resolve(__dirname, '..', 'playwright', '.auth');

/** Storage-state path for a role, e.g. `playwright/.auth/subject.json`. */
export const storageStatePath = (roleKey: string): string =>
  path.join(AUTH_DIR, `${roleKey}.json`);

// ---------------------------------------------------------------------------
// Suite constants (no magic numbers scattered across the tests).
// ---------------------------------------------------------------------------

/** Deliberately non-existent id for write probes — never mutates real data. */
export const NONEXISTENT_ID = 'AUTH-PROBE-NONEXISTENT';

/** Prefix for the disposable sessions created by the state factory (FINDING-007). */
export const REGTEST_PREFIX = 'REGTEST-';

/** Minimum acceptable year for the dashboard `cutoff` (FINDING-004a). */
export const QE_MIN_CUTOFF_YEAR = 2000;

/** Tolerance, in percentage points, between the displayed and canonical index (FINDING-004c). */
export const QE_DISPLAY_TOLERANCE = 1.0;

/** Credential attachment served without authorization (FINDING-002). */
export const CREDENTIAL_ASSET_PATH = '/assets/audit/onboarding-robertson-20260312.pdf';

/**
 * Real ids that must exist in the target, used by read probes on `{id}` endpoints so a
 * vulnerable response is an unambiguous 200 (not an ambiguous 404). Sourced from the
 * audit; adjust if the target data changes.
 */
export const KNOWN_CHAMBER_ID = 'C-Δ-7';
export const KNOWN_SESSION_ID = 'SES-2038';

/**
 * Subject ids confirmed in the audit to be foreign to the test_subject session
 * (FINDING-005 read three distinct records under one session). Used to prove
 * unscoped object-level access. Adjust if the target data changes.
 */
export const FOREIGN_SUBJECT_IDS = ['S-0009', 'S-0010', 'S-0011'];
