import { test, expect } from '../../src/fixtures';
import { DashboardPage } from '../../src/pages/DashboardPage';

/**
 * FINDING-014 — the dashboard "Recent activity" feed renders raw field values with no
 * truncation or wrapping, so a long value (the 64-char case token in the reward-disbursed
 * entry) overflows the panel. Correct behavior: long values are truncated/wrapped within
 * the container, so the feed does not overflow horizontally. Today it overflows → red.
 *
 * Oracle note: this relies on the live feed containing the long-value entry the audit
 * describes; the audit confirms it is present. Director-dependent.
 */
test.describe('FINDING-014 — activity feed overflow (browser)', () => {
  test('[FINDING-014] the Recent activity feed must not overflow its container horizontally', async ({
    directorPage,
  }) => {
    if (directorPage === null) {
      test.skip(true, 'DIRECTOR_PASSWORD not set — UI tests need a Director session');
      return;
    }

    const dashboard = new DashboardPage(directorPage);
    await dashboard.goto();

    const card = dashboard.recentActivityCard();
    await expect(card, 'the Recent activity feed should render').toBeVisible();

    const overflowPx = await card.evaluate((el) => el.scrollWidth - el.clientWidth);
    expect(
      overflowPx,
      'long field values must be truncated or wrapped within the feed container (no horizontal overflow)',
    ).toBeLessThanOrEqual(1);
  });
});
