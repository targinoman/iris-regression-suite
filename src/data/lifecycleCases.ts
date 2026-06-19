import { SessionState } from '../types/models';

export type LifecycleTransition = 'start' | 'complete';

/** One row of decision-table B: an illegal execution transition that must be refused. */
export interface LifecycleCase {
  id: string;
  finding: string;
  transition: LifecycleTransition;
  /** The illegal source state the session is driven to before the transition. */
  sourceState: SessionState;
  rule: string;
}

/**
 * Decision-table B as data. The legal path is `pending-approval → approved (approve) →
 * in-progress (start) → completed (complete)`. `start` and `complete` enforce no source
 * precondition today, so every illegal source below must be refused with the state
 * unchanged. `draft` is included for traceability but is not reachable via the API
 * (the factory cannot create it), so those cases skip.
 */
export const lifecycleCases: LifecycleCase[] = [
  // start — legal only from `approved`.
  {
    id: 'LC-start-from-pending-approval',
    finding: 'FINDING-007',
    transition: 'start',
    sourceState: 'pending-approval',
    rule: 'Table B: start is illegal from pending-approval (skips approval)',
  },
  {
    id: 'LC-start-from-rejected',
    finding: 'FINDING-007',
    transition: 'start',
    sourceState: 'rejected',
    rule: 'Table B: start is illegal from rejected',
  },
  {
    id: 'LC-start-from-cancelled',
    finding: 'FINDING-007',
    transition: 'start',
    sourceState: 'cancelled',
    rule: 'Table B: start is illegal from cancelled',
  },
  {
    id: 'LC-start-from-completed',
    finding: 'FINDING-007',
    transition: 'start',
    sourceState: 'completed',
    rule: 'Table B: start is illegal from completed (terminal must not reopen)',
  },

  // complete — legal only from `in-progress`.
  {
    id: 'LC-complete-from-pending-approval',
    finding: 'FINDING-007',
    transition: 'complete',
    sourceState: 'pending-approval',
    rule: 'Table B: complete is illegal from pending-approval (skips approval and execution)',
  },
  {
    id: 'LC-complete-from-approved',
    finding: 'FINDING-007',
    transition: 'complete',
    sourceState: 'approved',
    rule: 'Table B: complete is illegal from approved (skips execution)',
  },
  {
    id: 'LC-complete-from-rejected',
    finding: 'FINDING-007',
    transition: 'complete',
    sourceState: 'rejected',
    rule: 'Table B: complete is illegal from rejected',
  },
  {
    id: 'LC-complete-from-cancelled',
    finding: 'FINDING-007',
    transition: 'complete',
    sourceState: 'cancelled',
    rule: 'Table B: complete is illegal from cancelled',
  },
  {
    id: 'LC-complete-from-completed',
    finding: 'FINDING-007',
    transition: 'complete',
    sourceState: 'completed',
    rule: 'Table B: complete is illegal from completed (terminal)',
  },
];
