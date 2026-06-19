import { test, expect } from '../../src/fixtures';
import { ROLE_PASSWORDS } from '../../src/config';
import { ReportsPage } from '../../src/pages/ReportsPage';

/**
 * FINDING-015 — of the three documented export formats, only CSV is implemented. Export
 * CSV is a working download anchor (positive control, green). Export PDF is a dead button
 * (must trigger an export → intentional red). "Operator format" has no interactive control
 * and no backing endpoint, so it is documented as a vestigial gap rather than asserted.
 *
 * Director-dependent (export is reserved to Director). The guard below runs before the
 * directorPage fixture is instantiated, so without DIRECTOR_PASSWORD these skip cleanly.
 */
test.describe('FINDING-015 — report export formats (browser)', () => {
  test.beforeEach(() => {
    test.skip(!ROLE_PASSWORDS.director, 'requires DIRECTOR_PASSWORD (export is Director-tier)');
  });

  test('[FINDING-015] Export CSV produces a downloadable artifact (positive control)', async ({
    directorPage,
  }) => {
    if (directorPage === null) {
      throw new Error('director page unavailable despite DIRECTOR_PASSWORD being set');
    }
    const reports = new ReportsPage(directorPage);
    await reports.goto();

    const downloadPromise = directorPage.waitForEvent('download', { timeout: 10000 });
    await reports.exportCsvLink().click();
    const download = await downloadPromise;

    expect(download.suggestedFilename(), 'Export CSV should download a CSV artifact').toMatch(/\.csv$/i);
  });

  test('[FINDING-015] Export PDF must trigger an export', async ({ directorPage }) => {
    if (directorPage === null) {
      throw new Error('director page unavailable despite DIRECTOR_PASSWORD being set');
    }
    const reports = new ReportsPage(directorPage);
    await reports.goto();

    const downloadPromise = directorPage.waitForEvent('download', { timeout: 5000 }).catch(() => null);
    await reports.exportPdfButton().click();
    const download = await downloadPromise;

    expect(
      download,
      'Export PDF must produce an export artifact (the control must be wired)',
    ).not.toBeNull();
  });

  test.skip('[FINDING-015] Operator format is a documented non-actionable control (vestigial)', async () => {
    // Operator format has no interactive control and no backing API endpoint: the export
    // endpoint (/api/admin/reports/export) takes no format parameter, and there is no PDF
    // or operator endpoint anywhere. There is no honest green/red oracle for a vestigial
    // label, so this is documented as a known gap; the real fix is to implement the format
    // or correct the documentation to match the single implemented format (CSV).
  });
});
