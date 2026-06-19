import { test, expect } from '../../src/fixtures';
import { ROLES } from '../../src/roles';
import { CASE_TOKEN, ROLE_PASSWORDS } from '../../src/config';
import {
  detailOf,
  flipOneChar,
  getMe,
  loginStorageState,
  roleCookieValue,
} from '../../src/auth/sessionHelpers';

/**
 * PC-03 (positive control, expected GREEN) — the X-Case-Token is validated server-side.
 * With a valid role cookie but a single character of the token flipped, the request must
 * be rejected with 401, proving the token is not decorative. (Residual, out of scope here:
 * the token is also accepted as a ?t= query param.)
 */
test.describe('PC-03 — case token validation (positive control)', () => {
  test('[PC-03] tampering one character of the case token is rejected with 401', async () => {
    test.skip(!ROLE_PASSWORDS.senior, 'SENIOR_PASSWORD not set');

    const state = await loginStorageState(ROLES.senior.roleId as number, ROLE_PASSWORDS.senior as string);
    const validCookie = roleCookieValue(state);
    const tamperedToken = flipOneChar(CASE_TOKEN);

    const res = await getMe(state, validCookie, tamperedToken);
    expect(res.status, 'a tampered case token must be rejected').toBe(401);
    // Compare the parsed detail case-insensitively — do not depend on capitalization.
    expect(detailOf(res.body), 'rejection should indicate token validation').toMatch(
      /invalid case token/i,
    );
  });
});
