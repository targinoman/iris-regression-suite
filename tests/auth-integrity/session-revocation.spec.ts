import { test, expect } from '../../src/fixtures';
import { ROLES } from '../../src/roles';
import { CASE_TOKEN, ROLE_PASSWORDS } from '../../src/config';
import { getMe, loginStorageState, logoutWith, roleCookieValue } from '../../src/auth/sessionHelpers';

/**
 * PC-02 (positive control, expected GREEN) — logout invalidates the session server-side.
 * Reusing the same captured (cryptographically valid) cookie after logout must be rejected
 * with 401 "Not logged in" — distinct from the signature error — proving the server tracks
 * active sessions beyond the signed cookie. Regression guard: if this returns 200, logout
 * has become client-side only and a captured cookie is valid until it expires.
 */
test.describe('PC-02 — session revocation on logout (positive control)', () => {
  test('[PC-02] reusing a cookie after logout is rejected with 401 Not logged in', async () => {
    test.skip(!ROLE_PASSWORDS.senior, 'SENIOR_PASSWORD not set');

    const state = await loginStorageState(ROLES.senior.roleId as number, ROLE_PASSWORDS.senior as string);
    const cookie = roleCookieValue(state);

    await logoutWith(state, cookie, CASE_TOKEN);

    // Reuse the SAME captured cookie value (still validly signed) after logout.
    const res = await getMe(state, cookie, CASE_TOKEN);
    expect(res.status, 'a cookie reused after logout must be rejected').toBe(401);
    expect(res.body, 'rejection should indicate server-side revocation, not a signature error').toContain(
      'Not logged in',
    );
  });
});
