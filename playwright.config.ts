import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */

const TAconfig = {
  apiKey: '46b3f2ac-c570-4d73-97b8-fb0a2e1e4fec',
  endpoint: 'https://test-application.com/api/v1',
  project: 'yevhen_sydorenko_personal',
  launch: 'Test Application Launch',
  attributes: [
    {
      key: 'key',
      value: 'value'
    },
    {
      value: 'value'
    }
  ],
  description: 'Test description',
  includePlaywrightProjectNameToCodeReference: true,
  includeTestSteps: true
};

export default defineConfig({
  timeout: 120000,
  expect: { timeout: 10000 },
  testDir: './tests/ui',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : 8,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: !process.env.SAUCE_VM
    ? [
        ['./framework/ui/config/MyReporter.ts'],
        [`html`, { open: 'never', outputFolder: './reports/playwright-report' }],
        [
          'monocart-reporter',
          {
            name: 'My Test Report',
            outputFile: './reports/monocart-report/report.html'
          }
        ],
        ['allure-playwright', { outputFolder: './reports/allure-generate', detail: true }],
        ['junit', { outputFile: './reports/xml/results.xml' }],
        ['@reportportal/agent-js-playwright', TAconfig]
      ]
    : [['html', { open: 'never', outputFolder: '__assets__/html-report/', attachmentsBaseURL: './' }]],
  // reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: process.env.CI ? true : false,
    actionTimeout: 10000,
    screenshot: 'only-on-failure',
    video: {
      mode: 'retain-on-failure',
      size: { width: 640, height: 480 }
    },
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:8080/',
    // storageState: 'state.json',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure'
    // launchOptions: {
    //     slowMo: 1000,
    //     logger: {
    //         isEnabled: (name, severity) => true,
    //         log: (name, severity, message, args) => console.log(`${name} ${message}`)
    //     }
    // }
  },
  globalSetup: require.resolve('./framework/global-setup.ts'),

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      grepInvert: /@2/
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      grepInvert: /@2/
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      grepInvert: /@2/
    },

    {
      name: 'run_same_test_in_parallel',
      use: { ...devices['Desktop Chrome'] },
      grep: /@2/,
      retries: 0
    },

    {
      name: 'run_same_test_in_parallel_second',
      use: { ...devices['Desktop Chrome'] },
      grep: /@2/,
      retries: 0
    }

    // {
    //     name: 'firefox',
    //     use: { ...devices['Desktop Firefox'] },
    // },
    //
    // {
    //     name: 'webkit',
    //     use: { ...devices['Desktop Safari'] },
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
  ]

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
