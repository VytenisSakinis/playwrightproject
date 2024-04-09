import { test, expect } from '@playwright/test';
import { getRandomString } from '../test-data';

test.describe('Test', () => {
    const validRandomStrings = Array.from({ length: 1 }, () =>
        getRandomString(7, 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPSDFGHJKLZXCVBNM123456789****')
    );
    const invalidRandomStrings = Array.from({ length: 1 }, () =>
        getRandomString(8, 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPSDFGHJKLZXCVBNM123456789*!@#$%^&():/<>?. ')
    );
    validRandomStrings.forEach((validRandomString, i) => {
        test(`${i} should be valid value`, async ({ page }) => {
            await page.goto('https://eviltester.github.io/TestingApp/apps/7charval/simple7charvalidation.htm');
            await page.fill('[name="characters"]', `${validRandomString}`);
            await page.click('[name="validate"]');
            const value = await page.inputValue('[name="validation_message"]');
            await expect(`${value}`, `${validRandomString} should be valid`).toEqual('Valid Value');
        });
    });
    invalidRandomStrings.forEach((invalidRandomString, i) => {
        test(`${i} should be invalid value`, async ({ page }) => {
            await page.goto('https://eviltester.github.io/TestingApp/apps/7charval/simple7charvalidation.htm');
            await page.fill('[name="characters"]', `${invalidRandomString}`);
            await page.click('[name="validate"]');
            const value = await page.inputValue('[name="validation_message"]');
            await expect(`${value}`, `${invalidRandomString} should be invalid`).toEqual('Invalid Value');
        });
    });

    test(`should be able to click`, async ({ page }) => {
        await page.goto('https://eviltester.github.io/TestingApp/apps/testwith/version/1/testwith.html');
        await page.fill('#w1lw0', 't');
        await page.fill('#w1lw1', 'e');
        await page.fill('#w1lw2', 's');
        await page.fill('#w1lw3', 't');
        await page.fill('#w2lw0', 'a');
        await page.fill('#w2lw1', 't');
        await page.fill('#w2lw2', 't');
        await page.fill('#w2lw3', 'i');
        await page.fill('#w2lw4', 't');
        await page.fill('#w2lw5', 'u');
        await page.fill('#w2lw6', 'd');
        await page.fill('#w2lw7', 'e');
        const selector = '//button[text()="Header"]';
        await page.$eval(selector, (element) => element.click());
        await expect(page.locator('#result')).toContainText('I t.e.s.t with a.t.t.i.t.u.d.e');
    });
    test(`should be able to click and asser image`, async ({ page }) => {
        await page.goto('https://eviltester.github.io/TestingApp/apps/testwith/version/1/testwith.html');
        await page.fill('#w1lw0', 't');
        await page.fill('#w1lw1', 'e');
        await page.fill('#w1lw2', 's');
        await page.fill('#w1lw3', 't');
        await page.fill('#w2lw0', 'a');
        await page.fill('#w2lw1', 't');
        await page.fill('#w2lw2', 't');
        await page.fill('#w2lw3', 'i');
        await page.fill('#w2lw4', 't');
        await page.fill('#w2lw5', 'u');
        await page.fill('#w2lw6', 'd');
        await page.fill('#w2lw7', 'e');
        const selector = '//button[text()="Render"]';
        await page.$eval(selector, (element) => element.click());
        await expect(page.locator('#canvas')).toHaveScreenshot();
    });
});
