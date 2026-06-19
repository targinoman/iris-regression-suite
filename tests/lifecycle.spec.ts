import { APIResponse } from '@playwright/test';
import { test } from '../src/fixtures';
import { SessionsApi } from '../src/api/SessionsApi';
import { SessionFactory } from '../src/factories/SessionFactory';
import { lifecycleCases, LifecycleTransition } from '../src/data/lifecycleCases';
import { expectIllegalTransition } from '../src/engine/lifecycle';

/**
 * FINDING-007 — execution transitions (`start`, `complete`) must enforce a legal source
 * state. Each case builds a disposable REGTEST- session, drives it to an illegal source,
 * runs the transition as Director (an authorized caller, to isolate the state dimension),
 * then reads the state back. Correct behavior: state unchanged AND status in {400,409,422}.
 * Today the transitions apply unconditionally → state changes → intentional red.
 *
 * Director-dependent: skipped without DIRECTOR_PASSWORD.
 */
function runTransition(
  sessions: SessionsApi,
  transition: LifecycleTransition,
  id: string,
): Promise<APIResponse> {
  return transition === 'start' ? sessions.start(id) : sessions.complete(id);
}

test.describe('Decision-table B — session lifecycle preconditions (FINDING-007)', () => {
  for (const lifecycleCase of lifecycleCases) {
    test(`[${lifecycleCase.finding}] ${lifecycleCase.transition} must be refused from ${lifecycleCase.sourceState} (state unchanged)`, async ({
      directorRequest,
    }) => {
      if (directorRequest === null) {
        test.skip(true, 'DIRECTOR_PASSWORD not set — lifecycle tests need a Director session');
        return;
      }

      const factory = new SessionFactory(directorRequest);
      const sessions = new SessionsApi(directorRequest);
      try {
        const created = await factory.createSession();
        const reached = await factory.driveTo(created.id, lifecycleCase.sourceState);
        if (!reached) {
          test.skip(
            true,
            `source state "${lifecycleCase.sourceState}" is not reachable via the API`,
          );
          return;
        }

        const stateBefore = await factory.getState(created.id);
        const res = await runTransition(sessions, lifecycleCase.transition, created.id);
        const stateAfter = await factory.getState(created.id);

        expectIllegalTransition(res, stateBefore, stateAfter);
      } finally {
        await factory.teardown();
      }
    });
  }
});
