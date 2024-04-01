import { test, expect } from "@playwright/test";
import { USER, URL } from "../test-data";
import { before } from "node:test";
import { faker } from '@faker-js/faker';

test.describe("Issue creation", () => {
  const userData = { randomName: faker.string.uuid, randomIssue: faker.string.uuid}
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
    await page.fill('#field-issues-issueName', `${userData.randomName}`)
    await page.fill('#field-issues-descriptionText', `${userData.randomIssue}`)
    
  })
  test.afterAll(async ({page}) => {
    await page.fill(`#field-search-searchBox`, `${userData.randomName}`);
    await page.click("#field-search-searchSubmit");
    await page.click(`[title="${userData.randomIssue}"]`)
    await page.click('[title="Delete Issue"]')
    await page.click("#field-issues-okSubmit")
    await page.click("#field-issues-okSubmit")
    await page.click('[title="Delete Issue"]')
    await page.click('#field-issues-okSubmit')
    await expect(page.getByText(/Log Out/i)).toBeVisible();
  })
});
