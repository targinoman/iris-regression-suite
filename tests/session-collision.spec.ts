import { test, expect } from '../src/fixtures';
import { SessionsApi } from '../src/api/SessionsApi';
import { SessionFactory } from '../src/factories/SessionFactory';

/**
 * Id-collision contract (API) — separate from FINDING-009, this is a positive control that
 * the server enforces id uniqueness: re-creating a session with an existing id is rejected
 * with "Session ID already exists". It guards against a regression where a duplicate id
 * could silently overwrite an existing session (data integrity). Green today.
 *
 * Director-dependent (creating sessions requires a Director session).
 */
test.describe('Session id-collision contract (API positive control)', () => {
  test('[id-collision] re-creating a session with an existing id is rejected', async ({
    directorRequest,
  }) => {
    if (directorRequest === null) {
      test.skip(true, 'DIRECTOR_PASSWORD not set — creating sessions requires Director');
      return;
    }

    const factory = new SessionFactory(directorRequest);
    const sessions = new SessionsApi(directorRequest);
    try {
      const created = await factory.createSession();

      const duplicate = await sessions.create({
        id: created.id,
        subject_id: created.subject_id,
        chamber_id: created.chamber_id,
        scheduled_for: created.scheduled_for,
      });

      expect(
        duplicate.ok(),
        `duplicate id must be rejected (got HTTP ${duplicate.status()})`,
      ).toBeFalsy();
      expect(
        (await duplicate.text()).toLowerCase(),
        'rejection should report the id collision',
      ).toContain('already exists');
    } finally {
      await factory.teardown();
    }
  });
});
