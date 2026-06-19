import { test, expect } from '../../src/fixtures';
import { SessionFactory } from '../../src/factories/SessionFactory';
import { ApprovalsPage } from '../../src/pages/ApprovalsPage';

/**
 * FINDING-012 — in the Approvals view the tooltips are inverted: the Approve button shows
 * "Reject session" and the Reject button shows "Approve session" (the actions themselves
 * are correct). Correct behavior: each control's tooltip matches the action it performs.
 * Today the tooltips are swapped → intentional red.
 *
 * Run as Senior: the brief grants "approve and manage sessions" to the Senior Test
 * Coordinator (no Director dependency). A disposable pending-approval session is seeded as
 * Senior so a row renders.
 */
test.describe('FINDING-012 — Approve/Reject tooltips (browser)', () => {
  test('[FINDING-012] in the Approvals view, each control tooltip must match its action', async ({
    seniorPage,
    seniorRequest,
  }) => {
    const factory = new SessionFactory(seniorRequest);
    try {
      const seeded = await factory.createSession(); // pending-approval

      const approvals = new ApprovalsPage(seniorPage);
      await approvals.goto();

      const approve = approvals.approveButton(seeded.id);
      const reject = approvals.rejectButton(seeded.id);
      await expect(
        approve,
        'the seeded pending-approval row should render in the Approvals view',
      ).toBeVisible();

      const approveTooltip = (await approve.getAttribute('title')) ?? '';
      const rejectTooltip = (await reject.getAttribute('title')) ?? '';

      expect(approveTooltip, `Approve tooltip must describe approving (got "${approveTooltip}")`).toMatch(
        /approve/i,
      );
      expect(rejectTooltip, `Reject tooltip must describe rejecting (got "${rejectTooltip}")`).toMatch(
        /reject/i,
      );
    } finally {
      await factory.teardown();
    }
  });
});
