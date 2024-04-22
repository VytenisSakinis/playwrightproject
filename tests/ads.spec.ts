import { test, expect } from '@playwright/test';

test.describe('Advertisement website tests', () => {
    test('Should be able to post advertisement', async ({ page }) => {
        await page.goto('https://testingmarathon.com/testing/ad/');
        await page.fill('#title', 'Mercedes');
        await page.fill('#description', 'Runs great!');
        await page.fill('#price', `999999.99`);
        await page.fill('#email', 'mercedes@example.com');
        await page.fill('#address', 'Klaipeda');
        await page.getByText('Post Ad').click();
        await expect(page.locator('#message')).toContainText('Ad posted successfully with price: 999999.98 EUR');
        await expect(page.locator('#adsList')).toContainText(`Runs great!`);
        await expect(page.locator('#adsList')).toContainText(`Mercedes`);
        await expect(page.locator('#adsList')).toContainText(`Email: mercedes@example.com`);
        await expect(page.locator('#adsList')).toContainText(`Price: 999999.98 EUR`);
        await expect(page.locator('#adsList')).toContainText(`Address: Klaipeda`);
    });
});
