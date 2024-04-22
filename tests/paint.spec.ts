import { test, expect } from '@playwright/test';

test.describe('Robot or human tests', () => {
    test('Should be possible to paint', async ({ page }) => {
        await page.goto('https://testingmarathon.com/testing/MiniPaintApp/');
        await page.mouse.move(500, 500);
        await page.mouse.down();
        await page.mouse.move(500, 300);
        await page.mouse.up();
        await page.mouse.move(500, 300);
        await page.mouse.down();
        await page.mouse.move(700, 500);
        await page.mouse.up();
        await expect(page.locator('#drawingCanvas')).toHaveScreenshot();
    });

    test('Should be possible to paint and clear', async ({ page }) => {
        await page.goto('https://testingmarathon.com/testing/MiniPaintApp/');
        await page.mouse.move(500, 500);
        await page.mouse.down();
        await page.mouse.move(500, 300);
        await page.mouse.up();
        await page.mouse.move(500, 300);
        await page.mouse.down();
        await page.mouse.move(700, 500);
        await page.mouse.up();
        await page.getByText('Clear').click();
        await expect(page.locator('#drawingCanvas')).toHaveScreenshot();
    });
});
