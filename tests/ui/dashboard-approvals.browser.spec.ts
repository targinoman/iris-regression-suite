import { test, expect } from '../../src/fixtures';
import { SessionFactory } from '../../src/factories/SessionFactory';
import { DashboardPage } from '../../src/pages/DashboardPage';

/**
 * FINDING-011 — the dashboard "Pending approvals" Approve/Reject controls are dead: the
 * row component is rendered without the onApprove/onReject handlers (those are only wired
 * in the dedicated Approvals view). Correct behavior: clicking Approve on the dashboard
 * invokes the approve API. Today no request fires → intentional red.
 *
 * A disposable pending-approval session is seeded as Senior so the list has at least one
 * row, then we click the first Approve control (all are dead on the dashboard). Run as
 * Senior — the brief grants "approve and manage sessions" to the Senior Test Coordinator.
 */
test.describe('FINDING-011 — dashboard approval controls (browser)', () => {
  test('[FINDING-011] clicking Approve on the dashboard pending-approval list must call the approve API', async ({
    seniorPage,
    seniorRequest,
  }) => {
    const factory = new SessionFactory(seniorRequest);
    try {
      await factory.createSession(); // ensure at least one pending-approval row exists

      const dashboard = new DashboardPage(seniorPage);
      await dashboard.goto();

      const approve = dashboard.anyApproveButton();
      await expect(
        approve,
        'a pending-approval row should render on the dashboard',
      ).toBeVisible({ timeout: 15000 });

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
