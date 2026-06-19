/** Domain types mirrored from openapi.json (only the fields the suite needs). */

export type SessionState =
  | 'draft'
  | 'pending-approval'
  | 'approved'
  | 'in-progress'
  | 'completed'
  | 'cancelled'
  | 'rejected';

export interface TestSession {
  id: string;
  subject_id: string;
  chamber_id: string;
  observer_role_id?: number | null;
  scheduled_for: string;
  state: SessionState;
  completed_at?: string | null;
}

export interface TestSessionCreate {
  id: string;
  subject_id: string;
  chamber_id: string;
  scheduled_for: string;
}

export interface SubjectSummary {
  id: string;
  status: string;
}

export interface ChamberSummary {
  id: string;
  type: string;
  operational_status: string;
}

export interface Dashboard {
  qe_index: number;
  sessions_counted: number;
  cutoff: string;
}
