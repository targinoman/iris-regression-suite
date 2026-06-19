import { test, expect } from '../../src/fixtures';
import { SessionFactory } from '../../src/factories/SessionFactory';
import { DashboardPage } from '../../src/pages/DashboardPage';

/**
 * FINDING-011 — the dashboard "Pending approvals" Approve/Reject controls are dead: the
 * row component is rendered without the onApprove/onReject handlers (those are only wired
 * in the dedicated Approvals view). Correct behavior: clicking Approve on the dashboard
 * invokes the approve API. Today no request fires → intentional red.
 *
 * Run as Senior: the brief grants "approve and manage sessions" to the Senior Test
 * Coordinator, so Senior is the legitimate tier for approvals (no Director dependency). A
 * disposable pending-approval session is seeded as Senior so the list has a row.
 */
test.describe('FINDING-011 — dashboard approval controls (browser)', () => {
  test('[FINDING-011] clicking Approve on the dashboard pending-approval list must call the approve API', async ({
    seniorPage,
    seniorRequest,
  }) => {
    const factory = new SessionFactory(seniorRequest);
    try {
      const seeded = await factory.createSession(); // starts in pending-approval

      const dashboard = new DashboardPage(seniorPage);
      await dashboard.goto();

      const approve = dashboard.approveButton(seeded.id);
      await expect(
        approve,
        'the seeded pending-approval row should render on the dashboard',
      ).toBeVisible();

      const approveRequest = seniorPage
        .waitForRequest(
          (req) => req.method() === 'POST' && /\/api\/admin\/sessions\/.+\/approve$/.test(req.url()),
          { timeout: 5000 },
        )
        .catch(() => null);
      await approve.click();
      const fired = await approveRequest;

      expect(
        fired,
        'clicking dashboard Approve must invoke the approve API (the control must be wired)',
      ).not.toBeNull();
    } finally {
      await factory.teardown();
    }
  });
});
