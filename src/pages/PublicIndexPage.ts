import { Locator, Page } from '@playwright/test';

/**
 * Page object for the public home, which displays the Quarterly Enrichment Index in a
 * stat card. The card has no test id, so it is located by its label text and the figure
 * is read from the large-figure element within the same card. If the public DOM changes,
 * this is the single place to adjust the locators.
 */
export class PublicIndexPage {
  private static readonly QE_LABEL = 'Quarterly Enrichment Index';

  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  /** The stat card whose label is the Quarterly Enrichment Index. */
  private indexCard(): Locator {
    return this.page
      .locator('.p-6', {
        has: this.page.getByText(PublicIndexPage.QE_LABEL, { exact: true }),
      })
      .first();
  }

  /** Reads the displayed index figure (e.g. "87.4%") and returns it as a number. */
  async displayedIndex(): Promise<number> {
    const figureText = await this.indexCard().locator('.text-5xl').first().innerText();
    return parseFloat(figureText.replace('%', '').trim());
  }
}
