import { APIRequestContext } from '@playwright/test';
import { test, expect } from '../src/fixtures';
import { authCases } from '../src/data/authCases';
import { AuthCase } from '../src/engine/authCase';
import { executeProbe } from '../src/engine/httpProbe';
import { expectedVerdict, observeVerdict, ExpectedVerdict } from '../src/engine/verdict';
import { ROLES, RoleKey } from '../src/roles';

interface RoleContexts {
  anon: APIRequestContext;
  subject: APIRequestContext;
  junior: APIRequestContext;
  senior: APIRequestContext;
  director: APIRequestContext | null;
}

/** Selects the request context for a case's caller; `null` when unavailable (skip). */
function pickContext(caller: RoleKey, contexts: RoleContexts): APIRequestContext | null {
  switch (caller) {
    case 'anon':
      return contexts.anon;
    case 'subject':
      return contexts.subject;
    case 'junior':
      return contexts.junior;
    case 'senior':
      return contexts.senior;
    case 'director':
      return contexts.director;
  }
}

function caseTitle(c: AuthCase, expected: ExpectedVerdict): string {
  const surface = `${c.method} ${c.pathTemplate}`;
  const suffix = c.control ? ' [positive control]' : '';
  return expected === 'deny'
    ? `[${c.finding}] ${c.caller} must be denied (401/403) on ${surface}${suffix}`
    : `[${c.finding}] ${c.caller} must pass authorization on ${surface}${suffix}`;
}

test.describe('Decision-table A — endpoint authorization', () => {
  for (const authCase of authCases) {
    const expected = expectedVerdict(ROLES[authCase.caller].tier, authCase.requiredTier);

    test(caseTitle(authCase, expected), async ({
      anonRequest,
      subjectRequest,
      juniorRequest,
      seniorRequest,
      directorRequest,
    }) => {
      const context = pickContext(authCase.caller, {
        anon: anonRequest,
        subject: subjectRequest,
        junior: juniorRequest,
        senior: seniorRequest,
        director: directorRequest,
      });
      if (context === null) {
        test.skip(true, `no authenticated context for role "${authCase.caller}"`);
        return;
      }

      const res = await executeProbe(context, authCase);
      const observed = observeVerdict(res.status());

      if (expected === 'deny') {
        expect(
          observed,
          `${authCase.rule} — caller must be denied (401/403), got HTTP ${res.status()}`,
        ).toBe('barred');
      } else {
        // Allow case: an authorized caller must reach past the role gate. A write probe
        // against a non-existent id surfaces as 'inconclusive' (404) — still not denied —
        // so the oracle is "not barred" rather than strictly "passed".
        expect(
          observed,
          `${authCase.rule} — authorized caller must not be denied (401/403), got HTTP ${res.status()}`,
        ).not.toBe('barred');
      }
    });
  }
});
