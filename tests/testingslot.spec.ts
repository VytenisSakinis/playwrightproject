import { test, expect } from '@playwright/test';

test.describe('Slot machine tests', () => {
    test('testingmarather', async ({ page }) => {
        await page.goto('https://testingmarathon.com/testing/bugbook/');
        page.on('dialog', async (dialog) => {
            expect(dialog.message()).toContain(`You've already liked this post!`);
            await dialog.accept();
        });
        await page.click('#demo1');
        await page.click('#demo1');
    });
    test('slot machine', async ({ page }) => {
        await page.goto('https://testingmarathon.com/testing/slot_machine_game/');
        const results = ['You win!', 'Try again!'];
        for (const result of results) {
            await expect
                .poll(
                    async () => {
                        await page.click('#spinButton');
                        return await page.textContent('#result');
                    },
                    {
                        timeout: 15_000
                    }
                )
                .toEqual(result);
        }
    });
});
