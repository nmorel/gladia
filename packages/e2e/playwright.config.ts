import {defineConfig, devices} from '@playwright/test'
import * as dotenv from 'dotenv'

/**
 * Load all env files
 */
dotenv.config({path: '../../.env'})
dotenv.config({path: '../../apps/api/.env'})
dotenv.config({path: '../../apps/ui/.env'})
dotenv.config()

const uiUrl = `http://${process.env.UI_HOST ?? 'localhost'}:${process.env.UI_PORT ?? 3000}`
const apiUrl = `http://${process.env.API_HOST ?? 'localhost'}:${process.env.API_PORT ?? 3300}`

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: uiUrl,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Attribute used for the getByTestId locator */
    testIdAttribute: 'id',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']},
    },

    // {
    //   name: 'firefox',
    //   use: {...devices['Desktop Firefox']},
    // },

    // {
    //   name: 'webkit',
    //   use: {...devices['Desktop Safari']},
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ..devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: [
    {
      command: 'pnpm nx serve @gladia/ui',
      url: uiUrl,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'pnpm nx serve @gladia/api',
      url: `${apiUrl}/doc`,
      reuseExistingServer: !process.env.CI,
    },
  ],
})
