import { test, expect } from '../../src/fixtures';
import { SessionsPage } from '../../src/pages/SessionsPage';

/**
 * FINDING-009 (primary test) — the "Schedule a test session" workflow is broken: the
 * client's create form POSTs subject_id, chamber_id, apparatus_id and scheduled_for but
 * omits the required `id`, so every submission returns 422. Correct behavior: submitting
 * the form sends a non-empty `id`. Today it is omitted → intentional red; it goes green
 * when the form is fixed.
 *
 * Run as Junior: the brief grants "draft test sessions" to the Junior Test Coordinator, so
 * Junior is the legitimate tier for scheduling. Surgical oracle: intercept the
 * POST /api/admin/sessions the form fires and assert its body carries a non-empty id.
 */
test.describe('FINDING-009 — session scheduling via the UI (browser)', () => {
  test('[FINDING-009] submitting the schedule form must POST a non-empty session id', async ({
    juniorPage,
  }) => {
    const sessions = new SessionsPage(juniorPage);
    await sessions.goto();
    await sessions.openWizardAndReachReview();

    const createRequest = juniorPage.waitForRequest(
      (req) => req.method() === 'POST' && /\/api\/admin\/sessions$/.test(req.url()),
      { timeout: 5000 },
    );
    await sessions.scheduleButton().click();
    const request = await createRequest;

    const body = request.postDataJSON() as { id?: unknown };
    const hasNonEmptyId = typeof body.id === 'string' && body.id.length > 0;
    expect(
      hasNonEmptyId,
      `the schedule form must include a non-empty id in the POST body (got ${JSON.stringify(body.id)})`,
    ).toBe(true);
  });
});
