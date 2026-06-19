import { APIRequestContext } from '@playwright/test';
import { randomUUID } from 'crypto';
import { AdminApi } from '../api/AdminApi';
import { SessionsApi } from '../api/SessionsApi';
import { REGTEST_PREFIX } from '../config';
import {
  ChamberSummary,
  SessionState,
  SubjectSummary,
  TestSession,
  TestSessionCreate,
} from '../types/models';

type TransitionAction = 'approve' | 'reject' | 'start' | 'complete' | 'cancel';

/**
 * The single transition that produces each state. 'pending-approval' is the creation
 * state (no transition) and 'draft' is intentionally absent: the current system does not
 * create sessions in 'draft', so the factory reports that target as unreachable and the
 * consuming test skips rather than asserting on a wrong setup.
 */
const TRANSITION_BY_STATE: Partial<Record<SessionState, TransitionAction>> = {
  approved: 'approve',
  rejected: 'reject',
  'in-progress': 'start',
  completed: 'complete',
  cancelled: 'cancel',
};

/**
 * State factory for FINDING-007. Creates disposable `REGTEST-` sessions as Director and
 * drives them to a source state along the available path, so the lifecycle tests never
 * mutate the real sessions from the listing. Tear down with `teardown()` (cancels them).
 *
 * Documented lifecycle: `pending-approval → approved → in-progress → completed`
 * (plus `rejected`, `cancelled`). A created session starts in `pending-approval`.
 *
 * Note: on the current vulnerable deploy a single transition reaches each state because
 * no precondition is enforced (e.g. `complete` jumps straight from `pending-approval`).
 * On a fixed deploy some source states may need the legitimate intermediate steps; when a
 * target cannot be reached, `driveTo` returns false and the consuming test skips.
 */
export class SessionFactory {
  private readonly admin: AdminApi;
  private readonly sessions: SessionsApi;
  private readonly createdIds: string[] = [];

  constructor(request: APIRequestContext) {
    this.admin = new AdminApi(request);
    this.sessions = new SessionsApi(request);
  }

  /**
   * Creates a disposable REGTEST- session and returns it (state read back from the API).
   * The session starts in `pending-approval`.
   */
  async createSession(): Promise<TestSession> {
    const body: TestSessionCreate = {
      id: `${REGTEST_PREFIX}${randomUUID()}`,
      subject_id: await this.pickActiveSubjectId(),
      chamber_id: await this.pickUsableChamberId(),
      scheduled_for: new Date().toISOString(),
    };
    const res = await this.sessions.create(body);
    if (!res.ok()) {
      throw new Error(`failed to create REGTEST session (HTTP ${res.status()})`);
    }
    this.createdIds.push(body.id);
    return (await res.json()) as TestSession;
  }

  async getSession(id: string): Promise<TestSession> {
    const res = await this.sessions.get(id);
    if (!res.ok()) {
      throw new Error(`failed to read session ${id} (HTTP ${res.status()})`);
    }
    return (await res.json()) as TestSession;
  }

  async getState(id: string): Promise<SessionState> {
    return (await this.getSession(id)).state;
  }

  /**
   * Drives a session to `target` using the available transitions, reading the state back.
   * Returns false when the target is not reachable via the API (e.g. 'draft').
   */
  async driveTo(id: string, target: SessionState): Promise<boolean> {
    if (target === 'pending-approval') {
      return (await this.getState(id)) === 'pending-approval';
    }
    const action = TRANSITION_BY_STATE[target];
    if (action === undefined) {
      return false;
    }
    await this.applyTransition(id, action);
    return (await this.getState(id)) === target;
  }

  /** Best-effort teardown: cancels every REGTEST- session created by this factory. */
  async teardown(): Promise<void> {
    for (const id of this.createdIds) {
      try {
        await this.sessions.cancel(id);
      } catch {
        // best-effort cleanup; ignore failures
      }
    }
    this.createdIds.length = 0;
  }

  private applyTransition(id: string, action: TransitionAction): Promise<unknown> {
    switch (action) {
      case 'approve':
        return this.sessions.approve(id);
      case 'reject':
        return this.sessions.reject(id);
      case 'start':
        return this.sessions.start(id);
      case 'complete':
        return this.sessions.complete(id);
      case 'cancel':
        return this.sessions.cancel(id);
    }
  }

  private async pickActiveSubjectId(): Promise<string> {
    const res = await this.admin.listSubjects();
    if (!res.ok()) {
      throw new Error(`failed to list subjects (HTTP ${res.status()})`);
    }
    const subjects = (await res.json()) as SubjectSummary[];
    const chosen = subjects.find((s) => s.status === 'active') ?? subjects[0];
    if (chosen === undefined) {
      throw new Error('no subjects available to build a REGTEST session');
    }
    return chosen.id;
  }

  private async pickUsableChamberId(): Promise<string> {
    const res = await this.admin.listChambers();
    if (!res.ok()) {
      throw new Error(`failed to list chambers (HTTP ${res.status()})`);
    }
    const chambers = (await res.json()) as ChamberSummary[];
    const online = chambers.filter((c) => c.operational_status === 'online');
    const chosen = online.find((c) => c.type !== 'legacy') ?? online[0] ?? chambers[0];
    if (chosen === undefined) {
      throw new Error('no chambers available to build a REGTEST session');
    }
    return chosen.id;
  }
}
