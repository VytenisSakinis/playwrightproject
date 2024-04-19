import { test, expect } from '@playwright/test';

test.describe('Robot or human tests', () => {
    test('Robot Typing', async ({ page }) => {
        await page.goto('https://testingmarathon.com/testing/HumanOrRobot/');
        await page.click('#typingInput');
        await page.keyboard.type('As esu robotas');
        await expect(page.locator('#detectionResult')).toContainText('Robot typing detected');
    });

    test('Human Typing', async ({ page }) => {
        await page.goto('https://testingmarathon.com/testing/HumanOrRobot/');
        await page.click('#typingInput');
        await page.keyboard.type('As', { delay: 1000 });
        await page.keyboard.type('esu', { delay: 100 });
        await page.keyboard.type('robotas', { delay: 10 });
        await expect(page.locator('#detectionResult')).toContainText('Human typing detected');
    });
});
