import { Tier, RoleKey } from '../roles';

export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

/**
 * How a case probes the endpoint without mutating real data:
 * - 'read': GET the resource.
 * - 'write-nonexistent-id': mutate against a non-existent id so the role check is
 *   isolated and nothing is touched.
 * - 'create-invalid-body': POST a body that fails validation, so a passing
 *   authorization surfaces as 422 rather than a real creation.
 */
export type ProbeStrategy = 'read' | 'write-nonexistent-id' | 'create-invalid-body';

/** One row of decision-table A: a single authorization expectation, expressed as data. */
export interface AuthCase {
  /** Stable identifier, e.g. "AUTH-methodology-subject". */
  id: string;
  /** Audit finding this case traces to, e.g. "FINDING-003". */
  finding: string;
  /** Human-readable decision-table rule this case encodes. */
  rule: string;
  method: HttpMethod;
  /** Endpoint path; may contain the `{id}` placeholder. */
  pathTemplate: string;
  /** Minimum tier the endpoint is intended to require. */
  requiredTier: Tier;
  /** Role to probe as (for security cases, the role expected to be denied). */
  caller: RoleKey;
  probe: ProbeStrategy;
  /** Real id to substitute for `{id}` on read endpoints; defaults to the non-existent probe id. */
  probeId?: string;
  /** True when this asserts already-correct behavior (a positive control). */
  control: boolean;
}
