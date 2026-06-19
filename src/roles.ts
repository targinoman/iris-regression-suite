/**
 * Iris role scale. The effective identity comes from the `iris_role_session` cookie;
 * the numeric `roleId` is used only in the login body (`role_id`).
 */
export enum Tier {
  Anon = 0,
  Subject = 1,
  Junior = 2,
  Senior = 3,
  Director = 4,
}

export type RoleKey = 'anon' | 'subject' | 'junior' | 'senior' | 'director';

export interface RoleDef {
  key: RoleKey;
  /** Numeric login id (`role_id`). `null` for the anonymous pseudo-role. */
  roleId: number | null;
  tier: Tier;
}

export const ROLES: Record<RoleKey, RoleDef> = {
  anon: { key: 'anon', roleId: null, tier: Tier.Anon },
  subject: { key: 'subject', roleId: 271, tier: Tier.Subject },
  junior: { key: 'junior', roleId: 272, tier: Tier.Junior },
  senior: { key: 'senior', roleId: 273, tier: Tier.Senior },
  director: { key: 'director', roleId: 274, tier: Tier.Director },
};
