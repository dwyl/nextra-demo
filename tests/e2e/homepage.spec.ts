// !! PLEASE READ !!
/* 
Coverage for E2E effectively works, but the coverage is not using the sourcemaps properly, so coverage doesn't mean much.
We've decided to leave the infrastructure (coverage uses `monocart`) with its configuration for posteriority in case we need them.
E2E testing is more relevant knowing **if they pass or not**.
*/


import { test, expect } from "../_shared/app-fixtures"; // we use the overriden functions to get coverage

test.describe("homepage", () => {
  test("is mounted", async ({ page }) => {
    await page.goto("/");
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Welcome to Nextra Documentation/);
  });
});
