import { test, expect } from '@playwright/test';

test.describe('testingmarathon tests', () => {
    test('Should be possible to open Tyrion Lannister profile', async ({ page }) => {
        const context = page.context();
        await context.addCookies([{ name: 'session', value: '3', url: 'https://testingmarathon.com' }]);
        await page.goto('https://testingmarathon.com/testing/unsecured_session/');
        await expect(page.locator('#name')).toContainText('Name: Tyrion Lannister');
    });

    test('Should be possible to reproduce pentium bug', async ({ page }) => {
        await page.goto('https://testingmarathon.com/testing/pentium_fdiv_bug/');
        const calculatorArray = ['4', '1', '9', '5', '8', '3', '5', '/', '3', '1', '4', '5', '7', '2', '7', '='];
        for (const combination of calculatorArray) {
            await page.getByText(combination).click();
        }
        const result = page.locator('#display');
        await expect(result).toHaveValue('1.333739068902037');
    });
});
