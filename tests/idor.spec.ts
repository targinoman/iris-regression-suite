import { test, expect } from '../src/fixtures';
import { AdminApi } from '../src/api/AdminApi';
import { FOREIGN_SUBJECT_IDS } from '../src/config';
import { DENIED_STATUSES } from '../src/engine/verdict';

/**
 * FINDING-005 — Insecure Direct Object Reference. A Test Subject is scoped to its own
 * record, so reading a foreign subject by id must be refused: denied (401/403) or
 * not-found-as-protection (404). A 200 on a foreign id is the violation. Today the
 * endpoint returns 200 for arbitrary ids → intentional red.
 *
 * Object-level oracle: denied statuses plus 404 are safe; anything else (notably 200) fails.
 */
const IDOR_SAFE_STATUSES: readonly number[] = [...DENIED_STATUSES, 404];

test.describe('FINDING-005 — IDOR on subject records', () => {
  for (const subjectId of FOREIGN_SUBJECT_IDS) {
    test(`[FINDING-005] Subject must not read foreign subject record ${subjectId} (expects 401/403/404)`, async ({
      subjectRequest,
    }) => {
      const res = await new AdminApi(subjectRequest).getSubject(subjectId);
      expect(
        IDOR_SAFE_STATUSES,
        `Subject must be denied object-level access to ${subjectId} (got HTTP ${res.status()})`,
      ).toContain(res.status());
    });
  }
});
