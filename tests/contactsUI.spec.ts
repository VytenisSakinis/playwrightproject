import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('should', () => {
    test('Should be able to log in', async ({ page }) => {
        const email = faker.internet.email();
        const context = page.context();
        await context.addCookies([
            {
                name: 'session.omnisend',
                value: 'cdf23879bcd7d32067fb02e19e80578148c08eeb4aecda4d7d1ed9cdf760cdaa',
                url: 'https://app.omnisend.com'
            }
        ]);
        await page.goto('https://app.omnisend.com/audience/imports/wizard/contact');
        await page.fill('//input[@placeholder="Enter email"]', `${email}`);
        await page.click('//*[contains(text(), "This person gave permission to be added to the list.")]');
        await page.click('//*[contains(text(), "Add subscriber")]');
        await expect(page.locator('//tbody')).toContainText(`${email.toLowerCase()}`);

        await page.goto('https://app.omnisend.com/audience/segments/editor/');
        await page.click('//*[contains(text(), "Add filter")]');
        await page.click('//*[contains(text(), "Email address")]');
        await page.click('//div[@class="select ng-invalid"]');
        await page.fill('//*[@placeholder="Search or enter new value"]', email);
        await page.keyboard.press('Enter');
        await page.keyboard.press('Escape');
        await page.click('//*[contains(text(), "Save & show contacts")]');
        await page.fill('//input', email);
        await page.click('//div[(text()=" Save ")]');
        await expect(page.locator('//tbody')).toContainText(`${email.toLowerCase()}`, { timeout: 30000 });
    });
});
