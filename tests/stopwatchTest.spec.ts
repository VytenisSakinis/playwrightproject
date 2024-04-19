import { test, expect } from '@playwright/test';

test.describe('Valve tests', () => {
    test('Stop watch should be working', async ({ page }) => {
        await page.goto('https://testingmarathon.com/testing/Timer/');
        await page.click('#start');
        await page.click('#stop');
        await page.click('#resume');
        await page.click('#stop');
        await page.click('#resume');
        await page.click('#stop');

        const time = await page.locator('#display').textContent();
        const seconds = time.split(':');
        await expect(page.locator('#display')).not.toContainText('00:00:00.00');
        await expect(parseFloat(seconds[2])).toBeGreaterThan(0);
    });

    test('Stop watch should be to stop and resume many times', async ({ page }) => {
        await page.goto('https://testingmarathon.com/testing/Timer/');
        await page.click('#start');
        await page.click('#stop');

        for (let i = 0; i < 4; i++) {
            await page.click('#resume');
            await page.click('#stop');
        }

        await expect(page.locator('#display')).toContainText('00:00:00.00');
    });
});
