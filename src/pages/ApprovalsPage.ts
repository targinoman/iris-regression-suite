import { Locator, Page } from '@playwright/test';
import { escapeRegExp } from '../utils/regex';

/**
 * Page object for the dedicated Approvals view (/admin/approvals), where the Approve/Reject
 * actions are wired. Each row's controls are addressed by the session id in the accessible
 * name; the `title` attribute is the tooltip under test in FINDING-012.
 */
export class ApprovalsPage {
  static readonly PATH = '/admin/approvals';

  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto(ApprovalsPage.PATH);
  }

  approveButton(sessionId: string): Locator {
    return this.page.getByRole('button', {
      name: new RegExp(`^Approve\\b.*${escapeRegExp(sessionId)}`),
    });
  }

  rejectButton(sessionId: string): Locator {
    return this.page.getByRole('button', {
      name: new RegExp(`^Reject\\b.*${escapeRegExp(sessionId)}`),
    });
  }
}
