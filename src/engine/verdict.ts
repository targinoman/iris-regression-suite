import { Tier } from '../roles';

/** What the decision table expects for the caller. */
export type ExpectedVerdict = 'allow' | 'deny';

/** How the real response is reduced to the binary vocabulary (+ inconclusive). */
export type ObservedVerdict = 'barred' | 'passed' | 'inconclusive';

/** Denied by role: the server refused authorization. */
export const DENIED_STATUSES: readonly number[] = [401, 403];

/** Passed: reached business logic or validation. */
export const PASSED_STATUSES: readonly number[] = [200, 201, 409, 422];

/** Expected = allow if the caller's tier reaches the required tier. */
export function expectedVerdict(callerTier: Tier, requiredTier: Tier): ExpectedVerdict {
  return callerTier >= requiredTier ? 'allow' : 'deny';
}

/**
 * Reduces the real response to the oracle's vocabulary.
 * A `404` on a non-existent-id probe is ambiguous → `inconclusive` (to inspect).
 */
export function observeVerdict(status: number): ObservedVerdict {
  if (DENIED_STATUSES.includes(status)) return 'barred';
  if (PASSED_STATUSES.includes(status)) return 'passed';
  return 'inconclusive';
}
