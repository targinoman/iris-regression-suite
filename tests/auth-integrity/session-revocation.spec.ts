import { test, expect } from '../../src/fixtures';
import { ROLES } from '../../src/roles';
import { CASE_TOKEN, ROLE_PASSWORDS } from '../../src/config';
import { getMe, loginStorageState, logoutWith, roleCookieValue } from '../../src/auth/sessionHelpers';

/**
 * FINDING-016 (security test, expected RED today) — logout does NOT invalidate the session
 * server-side. Reusing the same captured, validly-signed cookie after POST /api/auth/logout
 * still authenticates (200 with the user's data); the server only removes the cookie from
 * the client jar. Three distinct server states: no cookie → "Not logged in"; bad signature
 * → "Invalid session"; valid signature → authenticates, with or without a prior logout.
 *
 * Secure behavior: a cookie reused after logout must be rejected (401) via server-side
 * revocation (deny-list, per-session nonce, or rotation on logout). No message is asserted
 * — the corrected behavior's wording is unknown. Goes green when revocation is implemented.
 */
test.describe('FINDING-016 — logout does not invalidate the session server-side', () => {
  test('[FINDING-016] a cookie reused after logout must be rejected', async () => {
    test.skip(!ROLE_PASSWORDS.senior, 'SENIOR_PASSWORD not set');

    const state = await loginStorageState(ROLES.senior.roleId as number, ROLE_PASSWORDS.senior as string);
    const cookie = roleCookieValue(state);

    await logoutWith(state, cookie, CASE_TOKEN);

    // Reuse the SAME captured cookie value (still validly signed) after logout.
    const res = await getMe(state, cookie, CASE_TOKEN);
    expect(res.status, 'a cookie reused after logout must be rejected (server-side revocation)').toBe(
      401,
    );
  });
});
