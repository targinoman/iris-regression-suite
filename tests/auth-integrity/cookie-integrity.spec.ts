import { test, expect } from '../../src/fixtures';
import { ROLES } from '../../src/roles';
import { CASE_TOKEN, ROLE_PASSWORDS } from '../../src/config';
import {
  detailOf,
  getMe,
  loginStorageState,
  roleCookieValue,
  tamperRole,
  withEmptySignature,
} from '../../src/auth/sessionHelpers';

/**
 * PC-01 (positive control, expected GREEN) — the signed `iris_role_session` cookie's
 * signature is verified on every request. Tampering the role id without re-signing must be
 * rejected. This is a security regression guard: if it ever returns 200 with the tampered
 * role, the signature has become decorative — a critical privilege-escalation regression.
 */
test.describe('PC-01 — role-session cookie integrity (positive control)', () => {
  test('[PC-01] tampering the role without re-signing is rejected with 401', async () => {
    test.skip(!ROLE_PASSWORDS.senior, 'SENIOR_PASSWORD not set');

    const state = await loginStorageState(ROLES.senior.roleId as number, ROLE_PASSWORDS.senior as string);
    const valid = roleCookieValue(state);

    // Role swaps keep the original signature → must be rejected with the signature error.
    for (const role of ['275', '274']) {
      const res = await getMe(state, tamperRole(valid, role), CASE_TOKEN);
      expect(res.status, `tampered role ${role} must be rejected`).toBe(401);
      // Compare the parsed detail case-insensitively — do not depend on capitalization.
      expect(detailOf(res.body), `tampered role ${role} must return the signature error`).toMatch(
        /invalid session/i,
      );
    }

    // Edge cases: empty signature and missing signature are also rejected (status only).
    const emptySig = await getMe(state, withEmptySignature(valid, '275'), CASE_TOKEN);
    expect(emptySig.status, 'an empty signature must be rejected').toBe(401);

    const noSig = await getMe(state, '275', CASE_TOKEN);
    expect(noSig.status, 'a missing signature must be rejected').toBe(401);
  });
});
