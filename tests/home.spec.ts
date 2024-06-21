import { test, expect } from "@playwright/test";

test.describe("homepage", () => {
  test("is mounted", async ({ page }) => {
    await page.goto("/");
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Welcome to Nextra Documentation/);
  });
});
