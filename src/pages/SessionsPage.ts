import { Locator, Page } from '@playwright/test';
import { gotoAdminSection } from './spaNavigation';

/**
 * Page object for the Test Sessions view (/admin/sessions) and its multi-step "New session"
 * scheduling wizard: Subject → Chamber → Apparatus → Scheduled for → Review → Schedule.
 * Locators live here.
 */
export class SessionsPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await gotoAdminSection(this.page, 'Sessions');
  }

  newSessionButton(): Locator {
    return this.page.getByRole('button', { name: 'New session' });
  }

  nextButton(): Locator {
    return this.page.getByRole('button', { name: 'Next' });
  }

  scheduleButton(): Locator {
    return this.page.getByRole('button', { name: /Schedule session/ });
  }

  private stepSelect(): Locator {
    return this.page.locator('select');
  }

  private scheduledForInput(): Locator {
    return this.page.locator('input[type="datetime-local"]');
  }

  private static futureDateTimeLocal(): string {
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
    return tomorrow.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:mm"
  }

  /** Opens the wizard and fills all steps with valid values, stopping at the review step. */
  async openWizardAndReachReview(): Promise<void> {
    await this.newSessionButton().click();

    // Step 0: Subject, Step 1: Chamber, Step 2: Apparatus — each renders a single select
    // whose first real option is index 1 (index 0 is the placeholder).
    for (let step = 0; step < 3; step += 1) {
      await this.stepSelect().selectOption({ index: 1 });
      await this.nextButton().click();
    }

    // Step 3: Scheduled for.
    await this.scheduledForInput().fill(SessionsPage.futureDateTimeLocal());
    await this.nextButton().click();
    // Now on the review step; the primary button is "Schedule session".
  }
}
