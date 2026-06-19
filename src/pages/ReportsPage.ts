import { Locator, Page } from '@playwright/test';

/**
 * Page object for the Reports / Export view (/admin/reports). CSV is wrapped in a real
 * download anchor (a link); PDF is a bare button with no handler; "Operator format" is a
 * non-actionable control. Locators live here.
 */
export class ReportsPage {
  static readonly PATH = '/admin/reports';

  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto(ReportsPage.PATH);
  }

  /** Export CSV is an anchor (role "link") that downloads the report. */
  exportCsvLink(): Locator {
    return this.page.getByRole('link', { name: 'Export CSV' });
  }

  exportPdfButton(): Locator {
    return this.page.getByRole('button', { name: 'Export PDF' });
  }
}
