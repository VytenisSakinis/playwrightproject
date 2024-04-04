import { test, expect } from '@playwright/test';

test.describe('Skelbiu.lt and alio.lt tests', () => {
    test('qwe1234 should be valid value', async ({ page }) => {
        await page.goto('https://eviltester.github.io/TestingApp/apps/7charval/simple7charvalidation.html/');
        await page.fill('[name="characters"]', 'qwe1234');
        await page.click('[name="validate"]');
        await expect(page.locator('[name="validation_message"]')).toContainText('Valid Value');
    });
    test('alio.lt', async ({ page }) => {
        await page.goto('https://www.alio.lt/');
        await page.fill('[data-creation="Tekstas"]', 'apple');
        await page.click('[data-creation="Submit"]');
        await page.click('#lv_ad_id_66457735');
        await expect(page.getByText('MACBOOK AIR 13.6 RETINA M2 8GB + APPLE MAGIC MOUSE, KAUNAS')).toBeVisible();
    });
});
