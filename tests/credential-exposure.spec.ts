import { test, expect } from '../src/fixtures';
import { AssetsApi } from '../src/api/AssetsApi';
import { CREDENTIAL_ASSET_PATH } from '../src/config';

/**
 * FINDING-002 — the onboarding PDF discloses live Director credentials and must require
 * Director-tier authorization. Today it is served for download without any auth check,
 * even to anonymous and to the lowest role → intentional red. The access-control aspect
 * is what is automated here (credential strength / rotation are operational findings).
 */
test.describe('FINDING-002 — credential attachment exposure', () => {
  test('[FINDING-002] anonymous must not download the credential attachment (expects non-200)', async ({
    anonRequest,
  }) => {
    const res = await new AssetsApi(anonRequest).download(CREDENTIAL_ASSET_PATH);
    expect(
      res.status(),
      `credential PDF must require authorization for anonymous (got HTTP ${res.status()})`,
    ).not.toBe(200);
  });

  test('[FINDING-002] Subject must not download the credential attachment (expects non-200)', async ({
    subjectRequest,
  }) => {
    const res = await new AssetsApi(subjectRequest).download(CREDENTIAL_ASSET_PATH);
    expect(
      res.status(),
      `credential PDF must require Director-tier, not reach Subject (got HTTP ${res.status()})`,
    ).not.toBe(200);
  });
});
