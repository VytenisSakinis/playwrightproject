import { test, expect } from '@playwright/test';

test.describe('testingmarathon tests', () => {
    test('Should be able to calculate your age with a date before 2000s and after 2000s', async ({ page }) => {
        await page.goto('https://testingmarathon.com/testing/Y2K_Bank_Account_Age_Calculator/');
        const datesArray = [
            { date: '1999-12-12', outcome: 'Vytenis Sakinis, Your age: 24 years' },
            { date: '2000-12-12', outcome: 'Vytenis Sakinis, Your age (with Y2K bug): 123 years' }
        ];
        for (const date of datesArray) {
            await page.fill('#firstName', 'Vytenis');
            await page.fill('#lastName', 'Sakinis');
            await page.fill('#dob', `${date.date}`);
            await page.click('//button[contains(text(),"Calculate Age")]');
            await expect(page.locator('#result')).toContainText(`${date.outcome}`);
        }
    });
});
