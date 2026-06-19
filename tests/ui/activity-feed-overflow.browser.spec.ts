import { test } from '../../src/fixtures';

/**
 * FINDING-014 — the dashboard "Recent activity" feed does not constrain long field values
 * (the 64-char case token in the reward-disbursed entry overflows the panel). This is a
 * confirmed UI finding, but it has no reliable automated oracle here, so it is documented
 * as a known gap rather than asserted (a green here would be a weak oracle, not a fix):
 *
 *  - The feed renders entries from the audit log, which is static seed data and is NOT
 *    updated by API/UI actions (FINDING-010). So the harness cannot create or guarantee the
 *    long-value entry the overflow depends on — it is environment/seed-dependent.
 *  - When the entry is present, the card grows to fit the value, so the overflow is absorbed
 *    by the layout; horizontal-overflow measurement on the card / content area / document did
 *    not reliably detect it (the run returned no overflow).
 *
 * Re-enable with a precise assertion once the long-value entry is guaranteed in the feed and
 * the exact overflowing element is identified from the live DOM.
 */
test.describe('FINDING-014 — activity feed overflow (documented UI gap)', () => {
  test.skip('[FINDING-014] long field values in the Recent activity feed must not break the layout', async () => {
    // Intentionally unimplemented: see the describe-level note. No fabricated green/red oracle.
  });
});
