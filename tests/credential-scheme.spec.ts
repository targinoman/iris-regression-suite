import { test, expect, request } from '@playwright/test';
import { AuthApi } from '../src/api/AuthApi';
import { ROLES } from '../src/roles';
import { BASE_URL, caseTokenHeader } from '../src/config';

/**
 * FINDING-008 — role passwords follow the predictable template `iris-<role-slug>-2026`.
 * The Senior credential was never issued, yet the template-derived `iris-senior-2026`
 * authenticates. Secure behavior: a template-derived password must NOT authenticate.
 * Today it returns 200 → intentional red; it goes green once the scheme is randomized.
 *
 * This uses the LITERAL predictable string (not SENIOR_PASSWORD from .env): the point is
 * the guessability of the scheme, and the test runs its own login independent of any
 * storageState. NOTE on coupling: the setup logs in as Senior with this same password, so
 * the day the scheme is fixed this test turns green AND the Senior credential in .env must
 * be updated — the red→green flip and the setup needing a new password are one event.
 */
const PREDICTABLE_SENIOR_PASSWORD = 'iris-senior-2026';

test.describe('FINDING-008 — predictable credential scheme (security test)', () => {
  test('[FINDING-008] the template-derived Senior password must not authenticate', async () => {
    const context = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: caseTokenHeader(),
    });
    const res = await new AuthApi(context).login(
      ROLES.senior.roleId as number,
      PREDICTABLE_SENIOR_PASSWORD,
    );
    const status = res.status();
    await context.dispose();

    expect(status, 'a guessable template-derived password must be rejected (401)').toBe(401);
  });
});
