import { test, expect } from "@playwright/test";
import { USER, URL } from "../test-data";
import { before } from "node:test";

test.describe("Issue creation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/register");
    await expect(page).toHaveTitle(/Web Client | WebIssues/);
    await page.fill("#field-login-login", `${USER.username}`);
    await page.fill("#field-login-password", `${USER.password}`);
    await page.click("//*[@id='field-login-loginSubmit']");
    await expect(page.getByText(/Log Out/i)).toBeVisible();
    await page.goto('/register/client/index.php?folder=1')
  });

  test("Should be able to create and delete issue", async ({page}) => {
    await page.click('[title="Add Issue"]')
    await page.fill('#field-issues-issueName', "Playweight issue title test")
    await page.fill('#field-issues-descriptionText', "Playweight issue title test describtion")
    await page.click("#field-issues-okSubmit")
    // await expect(page.isEnabled('//h2[text()="Hola"]'))
    await page.click('[title="Delete Issue"]')
    await page.click('#field-issues-okSubmit')
  })
});
