// must use this fixture instead of "@playwright/test" to be able to collect data for coverage
import { test, expect } from "../_shared/app-fixtures";

test.describe("homepage", () => {
  test("is mounted", async ({ page }) => {
    await page.goto("/");
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Welcome to Nextra Documentation/);
  });
});
