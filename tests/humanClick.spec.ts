import { test, expect } from '@playwright/test';
import { sleep } from '../test-data';

test.describe('Robot or human tests', () => {
    test('Robot clicking', async ({ page }) => {
        await page.goto('https://testingmarathon.com/testing/HumanMovingMouse/');
        await page.click('#startButton');
        await page.click('#checker');
        await expect(page.locator('#detectionResult')).toContainText('Robot detected');
    });

    test('Human clicking', async ({ page }) => {
        await page.goto('https://testingmarathon.com/testing/HumanMovingMouse/');
        await page.click('#startButton');
        await page.mouse.move(0, 0);
        await page.mouse.move(0, 1000);
        await sleep(100);
        await page.mouse.move(1000, 100);
        await page.mouse.move(100, 1000);
        await sleep(1000);
        await page.mouse.move(1231, 123);
        await page.click('#checker');
        await expect(page.locator('#detectionResult')).toContainText('Human detected');
    });
});
