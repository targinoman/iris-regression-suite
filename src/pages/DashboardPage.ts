import { Locator, Page } from '@playwright/test';
import { gotoAdminSection } from './spaNavigation';

/**
 * Page object for the admin dashboard, which is the admin SPA's index route ("/admin").
 * Everything is anchored to the route's stable root testid `route-admin-dashboard`, because
 * the SPA reuses class names (e.g. `divide-y`) across routes. On the dashboard every Approve
 * control is dead (FINDING-011), so any of them proves the defect.
 */
export class DashboardPage {
  constructor(private readonly page: Page) {}

  private root(): Locator {
    return this.page.locator('[data-testid="route-admin-dashboard"]');
  }

  async goto(): Promise<void> {
    // Reach the dashboard via a real NavLink click so its router loader runs correctly.
    await gotoAdminSection(this.page, 'Dashboard');
    await this.root().waitFor({ state: 'visible', timeout: 15000 });
  }

  /** Any Approve button in the Pending approvals list (accessible name starts with "Approve"). */
  anyApproveButton(): Locator {
    return this.root().getByRole('button', { name: /^Approve/ }).first();
  }
}
