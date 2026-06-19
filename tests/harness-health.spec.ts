import { test, expect } from '../src/fixtures';
import { AuthApi } from '../src/api/AuthApi';

/**
 * Harness health control (NOT a security test): proves that the setup project, the
 * per-role storageState and the fixtures deliver an authenticated context. These tests
 * are expected to pass — green here means the harness is healthy, not broken.
 */
test.describe('Harness health control (expected to pass)', () => {
  test('[CONTROL] Subject storageState yields an authenticated session on GET /api/auth/me', async ({
    subjectRequest,
  }) => {
    const res = await new AuthApi(subjectRequest).me();
    expect(res.status(), 'Subject session should be active').toBe(200);
    const body: unknown = await res.json();
    expect(typeof body, '/api/auth/me should return an identity object').toBe('object');
    expect(body).not.toBeNull();
  });

  test('[CONTROL] Junior storageState yields an authenticated session on GET /api/auth/me', async ({
    juniorRequest,
  }) => {
    const res = await new AuthApi(juniorRequest).me();
    expect(res.status(), 'Junior session should be active').toBe(200);
    const body: unknown = await res.json();
    expect(typeof body, '/api/auth/me should return an identity object').toBe('object');
    expect(body).not.toBeNull();
  });
});
