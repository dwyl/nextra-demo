// !! PLEASE READ !!
/* 
Coverage for E2E effectively works, but the coverage is not using the sourcemaps properly, so coverage doesn't mean much.
We've decided to leave the infrastructure (coverage uses `monocart`) with its configuration for posteriority in case we need them.
E2E testing is more relevant knowing **if they pass or not**.
*/

import { test, expect } from "../_shared/app-fixtures"; // we use the overriden functions to get coverage

const BASE_URL = "http://localhost:3000"

test.describe("homepage", () => {
  test("is mounted", async ({ page }) => {
    await page.goto("/");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Welcome to Nextra Documentation/);
  });
});

test("Basic auth", async ({ page, browser }) => {
  if (!process.env.TEST_PASSWORD) throw new TypeError("Missing TEST_PASSWORD");

  await test.step("should login", async () => {
    await page.goto(`${BASE_URL}/api/auth/signin`);
    await page.getByLabel("Password").fill(process.env.TEST_PASSWORD ?? "");
    await page.getByRole("button", { name: "Sign in with Password" }).click();
    await page.waitForURL(`${BASE_URL}`);

    const sessionResponse = await page.goto(
      `${BASE_URL}/api/auth/session`
    )
    const session = await sessionResponse?.json() ?? {}
    expect(session.user.email).toEqual("bob@alice.com")
    expect(session.user.name).toEqual("Bob Alice")
    expect(session.user.image).toEqual("")
  });

  await test.step("should logout", async () => {
    // Move to the homepage to log out
    await page.goto("/");

    await page.getByText("SIGN OUT").click();
    expect(page.url()).toBe(`${BASE_URL}/`)

    await page.waitForURL(`${BASE_URL}`)
    await page.waitForTimeout(1000); // wait for sign out to persist in IDP

    const sessionResponse = await page.goto(
      `${BASE_URL}/api/auth/session`
    )
    const session = await sessionResponse?.json()
    expect(session).toBe(null)
  });
});
