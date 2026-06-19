import { test } from '../src/fixtures';

/**
 * FINDING-013 — the legacy operator console grants a privileged "Chief Scientist" session
 * whose two secrets are both fully recoverable from client-delivered content: the PHINEAS
 * signing key (an acrostic of the IFR-71-Q3 section titles, which the bundle renders) and
 * the AUTHORISE code ("cake-at-four", printed verbatim in the §V transcript). Because both
 * factors are client-derivable, the privileged tier provides no real authentication boundary.
 *
 * This is an insecure-design finding, not a single misconfiguration. The meaningful
 * regression assertion — that privileged console actions require a server-side secret not
 * present in or derivable from client-delivered content — has no honest green/red oracle
 * against the product as shipped. Documented as a known design gap with `test.skip`; it
 * deliberately makes no passing assertion.
 */
test.describe('FINDING-013 — legacy console privileged auth (documented design gap)', () => {
  test.skip('[FINDING-013] privileged console actions must require a non-client-derivable server-side secret', async () => {
    // Intentionally unimplemented: see the describe-level note. A truthful assertion would
    // require the console to gate privileged commands behind a secret absent from the
    // client bundle, which is a design change with no testable oracle today.
  });
});
