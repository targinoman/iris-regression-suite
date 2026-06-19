import { test, expect } from '../src/fixtures';
import { AdminApi } from '../src/api/AdminApi';
import { Dashboard } from '../src/types/models';
import { QE_MIN_CUTOFF_YEAR } from '../src/config';

/**
 * FINDING-004 (API side) — the dashboard inputs behind the Quarterly Enrichment Index
 * must be sane. Today the cutoff is pinned to the 1971 Wing Δ shutdown and only one
 * session is counted, which collapses the index → intentional red.
 *
 * Director-dependent: the dashboard is intended to be Director-tier, so these are skipped
 * without DIRECTOR_PASSWORD. (That it is also readable by lower roles today is FINDING-003.)
 */
test.describe('FINDING-004 — Quarterly Enrichment Index integrity (API)', () => {
  test('[FINDING-004] dashboard cutoff must be current-era (year >= 2000, not the 1971 legacy date)', async ({
    directorRequest,
  }) => {
    if (directorRequest === null) {
      test.skip(true, 'DIRECTOR_PASSWORD not set — dashboard is Director-tier');
      return;
    }
    const res = await new AdminApi(directorRequest).dashboard();
    expect(res.ok(), `dashboard should be readable by Director (got HTTP ${res.status()})`).toBeTruthy();

    const dashboard = (await res.json()) as Dashboard;
    const cutoffYear = new Date(dashboard.cutoff).getUTCFullYear();
    expect(
      cutoffYear,
      `cutoff must not be anchored to a legacy/out-of-range date (got ${dashboard.cutoff})`,
    ).toBeGreaterThanOrEqual(QE_MIN_CUTOFF_YEAR);
  });

  test('[FINDING-004] dashboard sessions_counted must be greater than 1', async ({
    directorRequest,
  }) => {
    if (directorRequest === null) {
      test.skip(true, 'DIRECTOR_PASSWORD not set — dashboard is Director-tier');
      return;
    }
    const res = await new AdminApi(directorRequest).dashboard();
    expect(res.ok(), `dashboard should be readable by Director (got HTTP ${res.status()})`).toBeTruthy();

    const dashboard = (await res.json()) as Dashboard;
    expect(
      dashboard.sessions_counted,
      'the index must count more than a single session',
    ).toBeGreaterThan(1);
  });
});
