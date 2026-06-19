import { defineConfig, devices } from '@playwright/test';
// Importing config first ensures the .env is loaded and validated before anything else.
import { BASE_URL, CASE_TOKEN } from './src/config';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: 'html',
  use: {
    baseURL: BASE_URL,
    extraHTTPHeaders: { 'X-Case-Token': CASE_TOKEN },
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'api',
      testMatch: /.*\.spec\.ts/,
      testIgnore: /.*\.browser\.spec\.ts/,
      dependencies: ['setup'],
    },
    {
      name: 'browser',
      testMatch: /.*\.browser\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],
    },
  ],
});
