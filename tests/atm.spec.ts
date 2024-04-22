import { test, expect } from '@playwright/test';

test.describe('ATM Tests', () => {
    test('Should be able to withdraw money from your account', async ({ page }) => {
        page.on('dialog', async (dialog) => {
            await dialog.accept('1000');
        });
        await page.goto('https://testingmarathon.com/testing/atm/');
        await page.getByText('Insert Card').click();
        await page.fill('#pinInput', '1234');
        await page.click(`//button[contains(text(),'Enter')]`);
        await page.getByText('Withdraw').click();
        await expect(page.locator('#screen')).toContainText('Please take your cash. Your new balance is 410 EUR.');
    });

    test('Should be able to withdraw money from your account after inputting two invalid PINs', async ({ page }) => {
        page.on('dialog', async (dialog) => {
            await dialog.accept('1000');
        });
        await page.goto('https://testingmarathon.com/testing/atm/');
        await page.getByText('Insert Card').click();
        await page.fill('#pinInput', '1232');
        await page.click(`//button[contains(text(),'Enter')]`);
        await page.fill('#pinInput', '1232');
        await page.click(`//button[contains(text(),'Enter')]`);
        await page.fill('#pinInput', '1234');
        await page.click(`//button[contains(text(),'Enter')]`);
        await page.getByText('Withdraw').click();
        await expect(page.locator('#screen')).toContainText('Error: BSOD');
    });
});
