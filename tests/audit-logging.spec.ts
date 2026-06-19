import { test, expect } from '../src/fixtures';
import { AdminApi } from '../src/api/AdminApi';
import { SessionsApi } from '../src/api/SessionsApi';
import { SessionFactory } from '../src/factories/SessionFactory';

/**
 * FINDING-010 — Security Logging and Monitoring Failures (A09). Session lifecycle actions
 * produce no entry in /api/admin/audit; the log behaves as static seed data. The logging
 * contract is not defined yet, so there is no honest green/red oracle today. This is
 * documented as a control gap with `test.fixme` — it does not assert a pass. When logging
 * is implemented, remove `.fixme` and the body below becomes the live assertion.
 */
test.describe('FINDING-010 — session lifecycle audit logging (documented gap)', () => {
  test.fixme(
    '[FINDING-010] approving a session should append an audit entry (logging contract undefined)',
    async ({ directorRequest }) => {
      if (directorRequest === null) {
        return;
      }
      const factory = new SessionFactory(directorRequest);
      const admin = new AdminApi(directorRequest);
      const sessions = new SessionsApi(directorRequest);
      try {
        const created = await factory.createSession();
        const before = (await (await admin.audit()).json()) as unknown[];
        await sessions.approve(created.id);
        const after = (await (await admin.audit()).json()) as unknown[];
        expect(
          after.length,
          'approving a session should append a corresponding audit entry',
        ).toBeGreaterThan(before.length);
      } finally {
        await factory.teardown();
      }
    },
  );
});
