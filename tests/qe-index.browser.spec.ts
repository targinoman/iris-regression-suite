import { test, expect } from '../src/fixtures';
import { PublicIndexPage } from '../src/pages/PublicIndexPage';
import { AdminApi } from '../src/api/AdminApi';
import { Dashboard } from '../src/types/models';
import { QE_DISPLAY_TOLERANCE } from '../src/config';

/**
 * FINDING-004 (browser side) — the only browser test. The Quarterly Enrichment Index
 * shown on the public home must equal the institution's own canonical value (the
 * dashboard `qe_index`) within tolerance. Today the home shows a hardcoded 87.4% while
 * the canonical figure is ~22.7% → intentional red.
 *
 * Director-dependent: the canonical value comes from the Director dashboard, so this is
 * skipped without DIRECTOR_PASSWORD.
 */
test.describe('FINDING-004 — public QE index vs canonical (browser)', () => {
  test('[FINDING-004] displayed Quarterly Enrichment Index must match the canonical API value within tolerance', async ({
    page,
    directorRequest,
  }) => {
    if (directorRequest === null) {
      test.skip(true, 'DIRECTOR_PASSWORD not set — the canonical value comes from the Director dashboard');
      return;
    }

    const dashRes = await new AdminApi(directorRequest).dashboard();
    expect(dashRes.ok(), `dashboard should be readable by Director (got HTTP ${dashRes.status()})`).toBeTruthy();
    const canonical = ((await dashRes.json()) as Dashboard).qe_index;

    const home = new PublicIndexPage(page);
    await home.goto();
    const displayed = await home.displayedIndex();

    expect(
      Math.abs(displayed - canonical),
      `displayed ${displayed}% must match canonical ${canonical}% within ±${QE_DISPLAY_TOLERANCE} pts`,
    ).toBeLessThanOrEqual(QE_DISPLAY_TOLERANCE);
  });
});
