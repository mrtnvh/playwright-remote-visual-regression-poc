import { test, expect } from "@playwright/test";

test("visual test", async ({ page, browser }) => {
  await page.goto("https://playwright.dev/");

  // Create a screenshot.
  const screenshot = await page.screenshot();

  // Compare screenshots.
  expect(screenshot).toMatchSnapshot("playwright-homepage.png");
});
