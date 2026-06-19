import { APIResponse, expect, test } from '@playwright/test';
import { SessionState } from '../types/models';

/**
 * Status codes that mean "rejected on the merits of the request or the resource state".
 * Deliberately excludes 401/403 (auth — these tests run as an authorized caller to isolate
 * the state dimension), 404/405 (missing session / wrong route), and any 2xx (a 2xx with
 * the state unchanged would be a silent no-op, which is itself a defect).
 */
export const ILLEGAL_TRANSITION_STATUSES: readonly number[] = [400, 409, 422];

/** The ideal status for an illegal transition: conflict with the current resource state. */
export const PREFERRED_ILLEGAL_TRANSITION_STATUS = 409;

/**
 * Asserts an illegal lifecycle transition was correctly refused.
 *
 * Primary, hard oracle: the state is unchanged (read back after the transition). This is
 * what separates a vulnerable system from a fixed one and is robust to the status code.
 * Secondary: the status is in {400, 409, 422}. A non-blocking annotation flags when the
 * status is not the ideal 409 Conflict, without failing the test.
 */
export function expectIllegalTransition(
  res: APIResponse,
  stateBefore: SessionState,
  stateAfter: SessionState,
): void {
  expect(stateAfter, 'illegal transition must leave the state unchanged').toBe(stateBefore);
  expect(
    ILLEGAL_TRANSITION_STATUSES,
    `illegal transition must be rejected on the merits (400/409/422), got HTTP ${res.status()}`,
  ).toContain(res.status());

  if (res.status() !== PREFERRED_ILLEGAL_TRANSITION_STATUS) {
    test.info().annotations.push({
      type: 'note',
      description: `illegal transition rejected with HTTP ${res.status()}; 409 Conflict is the ideal contract`,
    });
  }
}
