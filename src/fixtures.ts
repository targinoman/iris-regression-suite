import {
  test as base,
  expect,
  request,
  APIRequestContext,
  Browser,
  BrowserContext,
  Page,
} from '@playwright/test';
import * as fs from 'fs';
import { BASE_URL, caseTokenHeader, storageStatePath } from './config';

/**
 * Each fixture delivers an APIRequestContext already carrying the X-Case-Token header
 * and, where applicable, the role's session cookie (via the storageState written by the
 * setup project). `directorRequest` is `null` when there is no Director state — the
 * consuming test must then skip gracefully (test.skip).
 */
export interface IrisFixtures {
  anonRequest: APIRequestContext;
  subjectRequest: APIRequestContext;
  juniorRequest: APIRequestContext;
  seniorRequest: APIRequestContext;
  directorRequest: APIRequestContext | null;
  /** Browser pages authenticated as the role (cookie + X-Case-Token). */
  juniorPage: Page;
  seniorPage: Page;
  /** Director page is null without Director state, so its tests skip gracefully. */
  directorPage: Page | null;
}

function newRoleContext(roleKey?: string): Promise<APIRequestContext> {
  return request.newContext({
    baseURL: BASE_URL,
    extraHTTPHeaders: caseTokenHeader(),
    ...(roleKey ? { storageState: storageStatePath(roleKey) } : {}),
  });
}

function newRoleBrowserContext(browser: Browser, roleKey: string): Promise<BrowserContext> {
  return browser.newContext({
    baseURL: BASE_URL,
    extraHTTPHeaders: caseTokenHeader(),
    storageState: storageStatePath(roleKey),
  });
}

export const test = base.extend<IrisFixtures>({
  anonRequest: [
    async ({}, use) => {
      const context = await newRoleContext();
      await use(context);
      await context.dispose();
    },
    { box: true },
  ],

  subjectRequest: [
    async ({}, use) => {
      const context = await newRoleContext('subject');
      await use(context);
      await context.dispose();
    },
    { box: true },
  ],

  juniorRequest: [
    async ({}, use) => {
      const context = await newRoleContext('junior');
      await use(context);
      await context.dispose();
    },
    { box: true },
  ],

  seniorRequest: [
    async ({}, use) => {
      const context = await newRoleContext('senior');
      await use(context);
      await context.dispose();
    },
    { box: true },
  ],

  directorRequest: [
    async ({}, use) => {
      if (!fs.existsSync(storageStatePath('director'))) {
        await use(null);
        return;
      }
      const context = await newRoleContext('director');
      await use(context);
      await context.dispose();
    },
    { box: true },
  ],

  juniorPage: [
    async ({ browser }, use) => {
      const context = await newRoleBrowserContext(browser, 'junior');
      const page = await context.newPage();
      await use(page);
      await context.close();
    },
    { box: true },
  ],

  seniorPage: [
    async ({ browser }, use) => {
      const context = await newRoleBrowserContext(browser, 'senior');
      const page = await context.newPage();
      await use(page);
      await context.close();
    },
    { box: true },
  ],

  directorPage: [
    async ({ browser }, use) => {
      if (!fs.existsSync(storageStatePath('director'))) {
        await use(null);
        return;
      }
      const context = await newRoleBrowserContext(browser, 'director');
      const page = await context.newPage();
      await use(page);
      await context.close();
    },
    { box: true },
  ],
});

export { expect };
