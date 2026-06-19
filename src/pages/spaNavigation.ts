import { Page } from '@playwright/test';

const ADMIN_NAV = 'nav[aria-label="Admin sections"]';

/**
 * Enters the admin SPA. The app is a single SPA served at "/"; deep-linking /admin/* returns
 * a server 404, and `page.goto('/admin')` does not render in the test context. A synthetic
 * popstate straight to the dashboard error-boundaries (it is the one route with a router
 * loader). So: boot at "/", client-route to a loader-free admin route (Approvals) to reveal
 * the sidebar, then navigate via real react-router NavLink clicks (which run loaders correctly).
 */
async function enterAdmin(page: Page): Promise<void> {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    window.history.pushState({}, '', '/admin/approvals');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
  await page.locator(ADMIN_NAV).waitFor({ state: 'visible', timeout: 15000 });
}

/** Enters the admin SPA and navigates to a section by its sidebar nav label. */
export async function gotoAdminSection(page: Page, navLabel: string): Promise<void> {
  await enterAdmin(page);
  await page.locator(ADMIN_NAV).getByRole('link', { name: navLabel, exact: true }).click();
}
