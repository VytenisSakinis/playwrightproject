import { test, expect } from "@playwright/test";
import { USER, URL } from "../test-data";
import { before } from "node:test";

test.describe("testingmarathon tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/register");
  });

  test("Should be able to log in", async ({ page }) => {
    await page.fill("#field-login-login", `${USER.username}`);
    await page.fill("#field-login-password", `${USER.password}`);
    await page.click("//*[@id='field-login-loginSubmit']");
    await expect(page).toHaveTitle(/Web Client | WebIssues/);
    await expect(page.getByText("Log Out")).toBeVisible();
    await expect(page.getByText("Log Out")).toContainText("Log Out");
  });

  test("Should not be able to log in with invalid username", async ({
    page,
  }) => {
    await page.fill("#field-login-login", `${USER.username}sssss`);
    await page.fill("#field-login-password", `${USER.password}`);
    await page.click("//*[@id='field-login-loginSubmit']");
    await expect(
      page.getByText("Incorrect value: Invalid login or password.")
    ).toBeVisible();
  });

  test("Should not be able to log in with invalid password", async ({
    page,
  }) => {
    await page.fill("#field-login-login", `${USER.username}`);
    await page.fill("#field-login-password", `${USER.password}sssss`);
    await page.click("//*[@id='field-login-loginSubmit']");
    await expect(
      page.getByText("Incorrect value: Invalid login or password.")
    ).toBeVisible();
  });

  test("Should not be able to log in with empty username", async ({ page }) => {
    await page.fill("#field-login-login", ``);
    await page.fill("#field-login-password", `sadsadas`);
    await page.click("//*[@id='field-login-loginSubmit']");
    await expect(
      page.getByText("Incorrect value: Required value is missing.")
    ).toBeVisible();
  });
});
