import { BrowserContextOptions, Project, defineConfig } from "@playwright/test";
import { devices } from "playwright";
import { defu } from "defu";

const projects: Project[] = [
  {
    name: "chromium (desktop)",
    use: {
      connectOptions: {
        wsEndpoint: "ws://localhost:9222",
      },
      ...devices["Desktop Chrome"],
    },
  },
  {
    name: "firefox (desktop)",
    use: {
      connectOptions: {
        wsEndpoint: "ws://localhost:9223",
      },
      ...devices["Desktop Firefox"],
    },
  },
  {
    name: "webkit (desktop)",
    use: {
      connectOptions: {
        wsEndpoint: "ws://localhost:9224",
      },
      ...devices["Desktop Safari"],
    },
  },
  {
    name: "chromium (mobile)",
    use: {
      connectOptions: {
        wsEndpoint: "ws://localhost:9222",
      },
      ...devices["Pixel 5"],
    },
  },
  {
    name: "firefox (mobile)",
    use: {
      connectOptions: {
        wsEndpoint: "ws://localhost:9223",
      },
      ...devices["Pixel 5"],
      isMobile: undefined,
    },
  },
  {
    name: "webkit (mobile)",
    use: {
      connectOptions: {
        wsEndpoint: "ws://localhost:9224",
      },
      ...devices["iPhone SE"],
    },
  },
];

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",

    deviceScaleFactor: 1,
  },

  /* Configure projects for major browsers */
  projects: [
    ...projects.map((project) =>
      defu(
        { name: `${project.name} - light`, use: { colorScheme: "light" as BrowserContextOptions["colorScheme"] } },
        project
      )
    ),
    ...projects.map((project) =>
      defu(
        { name: `${project.name} - dark`, use: { colorScheme: "dark" as BrowserContextOptions["colorScheme"] } },
        project
      )
    ),
  ],
});
