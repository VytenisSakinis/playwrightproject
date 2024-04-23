import { test, expect } from '@playwright/test';
import { shuffleArray } from '../test-data';

test.describe('TicTacToe test', () => {
    test('TicTacToe X should win', async ({ page }) => {
        page.on('dialog', async (dialog) => {
            expect(dialog.message()).toContain(`X wins!`);
            await dialog.accept();
        });
        await page.goto('https://testingmarathon.com/testing/TicTacToe/');
        await page.click(`//div[@id='1']`);
        await page.click(`//div[@id='2']`);
        await page.click(`//div[@id='4']`);
        await page.click(`//div[@id='3']`);
        await page.click(`//div[@id='7']`);
    });
    test('TicTacToe, O should win', async ({ page }) => {
        page.on('dialog', async (dialog) => {
            expect(dialog.message()).toContain(`O wins!`);
            await dialog.accept();
        });
        await page.goto('https://testingmarathon.com/testing/TicTacToe/');
        await page.click(`//div[@id='2']`);
        await page.click(`//div[@id='1']`);
        await page.click(`//div[@id='3']`);
        await page.click(`//div[@id='4']`);
        await page.click(`//div[@id='5']`);
        await page.click(`//div[@id='7']`);
    });
    test('TicTacToe, should be a tie', async ({ page }) => {
        page.on('dialog', async (dialog) => {
            expect(dialog.message()).toContain(`It's a tie!`);
            await dialog.accept();
        });
        await page.goto('https://testingmarathon.com/testing/TicTacToe/');
        await page.click(`//div[@id='1']`);
        await page.click(`//div[@id='3']`);
        await page.click(`//div[@id='2']`);
        await page.click(`//div[@id='4']`);
        await page.click(`//div[@id='6']`);
        await page.click(`//div[@id='8']`);
        await page.click(`//div[@id='7']`);
        await page.click(`//div[@id='5']`);
        await page.click(`//div[@id='9']`);
    });

    test('TicTacToe, random test', async ({ page }) => {
        page.on('dialog', async (dialog) => {
            expect(dialog.message()).toMatch(/It's a tie!|X wins!|O wins!/);
            gameOver = true;
            await dialog.accept();
        });
        await page.goto('https://testingmarathon.com/testing/TicTacToe/');
        let gameOver = false;
        const positions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const shuffle = shuffleArray(positions);

        for (const position of shuffle) {
            if (gameOver) break;
            await page.click(`//div[@id=${position}]`);
        }
    });
});
