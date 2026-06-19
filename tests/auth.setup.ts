import { test as setup, expect, request } from '@playwright/test';
import { AuthApi } from '../src/api/AuthApi';
import { ROLES, RoleKey } from '../src/roles';
import { BASE_URL, caseTokenHeader, ROLE_PASSWORDS, storageStatePath } from '../src/config';

/**
 * Setup project: logs in once per role and persists the `iris_role_session` cookie
 * to playwright/.auth/<role>.json. The test projects reuse that state.
 */
async function authenticateAndSave(roleKey: RoleKey, password: string): Promise<void> {
  const context = await request.newContext({
    baseURL: BASE_URL,
    extraHTTPHeaders: caseTokenHeader(),
  });
  const roleId = ROLES[roleKey].roleId;
  expect(roleId, `role ${roleKey} must have a numeric role id`).not.toBeNull();

  const res = await new AuthApi(context).login(roleId as number, password);
  expect(res.ok(), `login for ${roleKey} should succeed (got HTTP ${res.status()})`).toBeTruthy();

  await context.storageState({ path: storageStatePath(roleKey) });
  await context.dispose();
}

setup('authenticate Subject and save storageState', async () => {
  expect(ROLE_PASSWORDS.subject, 'SUBJECT_PASSWORD must be set in .env').toBeTruthy();
  await authenticateAndSave('subject', ROLE_PASSWORDS.subject as string);
});

setup('authenticate Junior and save storageState', async () => {
  expect(ROLE_PASSWORDS.junior, 'JUNIOR_PASSWORD must be set in .env').toBeTruthy();
  await authenticateAndSave('junior', ROLE_PASSWORDS.junior as string);
});

setup('authenticate Senior and save storageState', async () => {
  expect(ROLE_PASSWORDS.senior, 'SENIOR_PASSWORD must be set in .env').toBeTruthy();
  await authenticateAndSave('senior', ROLE_PASSWORDS.senior as string);
});

setup('authenticate Director and save storageState (skipped without DIRECTOR_PASSWORD)', async () => {
  setup.skip(
    !ROLE_PASSWORDS.director,
    'DIRECTOR_PASSWORD not set — Director tests will be skipped',
  );
  await authenticateAndSave('director', ROLE_PASSWORDS.director as string);
});
