import { test, expect } from '@playwright/test';

test.describe('Skelbiu.lt and alio.lt tests', () => {
    test('Skelbiu.lt', async ({ page }) => {
        await page.goto('https://www.skelbiu.lt/');
        await page.fill('#searchKeyword', 'apple');
        await page.click('#searchButton');
        await page.click('#ads33096553');
        await expect(page.getByText('Greitas, brangus Apple/samsung supirkimas')).toBeVisible();
    });
    test('alio.lt', async ({ page }) => {
        await page.goto('https://www.alio.lt/');
        await page.fill('[data-creation="Tekstas"]', 'apple');
        await page.click('[data-creation="Submit"]');
        await page.click('#lv_ad_id_66457735');
        await expect(page.getByText('MACBOOK AIR 13.6 RETINA M2 8GB + APPLE MAGIC MOUSE, KAUNAS')).toBeVisible();
    });
});
