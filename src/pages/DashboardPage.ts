import { Locator, Page } from '@playwright/test';
import { escapeRegExp } from '../utils/regex';

/**
 * Page object for the admin dashboard (/admin/dashboard). Locators live here; the
 * pending-approval rows render the action "Approve session <id>" and an Approve/Reject
 * button pair, so a row's controls are addressed by the session id in the accessible name.
 */
export class DashboardPage {
  static readonly PATH = '/admin/dashboard';

  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto(DashboardPage.PATH);
  }

  /** The Approve button in the Pending approvals list for a given session id. */
  approveButton(sessionId: string): Locator {
    return this.page.getByRole('button', {
      name: new RegExp(`^Approve\\b.*${escapeRegExp(sessionId)}`),
    });
  }

  /** The "Recent activity" feed card (the divide-y panel following the heading). */
  recentActivityCard(): Locator {
    return this.page
      .getByText('Recent activity', { exact: true })
      .locator('xpath=following::div[contains(@class,"divide-y")][1]');
  }
}
