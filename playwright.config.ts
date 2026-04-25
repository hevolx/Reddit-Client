import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright E2E test configuration.
 * Tests run against the production build served by `vite preview`.
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  // Fail CI if you accidentally left test.only
  forbidOnly: !!process.env.CI,
  // Retry on CI to handle flakiness
  retries: process.env.CI ? 2 : 0,
  // Limit parallel workers on CI
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  use: {
    // Base URL used by page.goto('/')
    baseURL: 'http://localhost:4173',
    // Collect trace on first retry for easier debugging
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // Start `vite preview` before running tests
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
