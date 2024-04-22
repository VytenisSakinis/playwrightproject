import { test, expect } from '@playwright/test';

test.describe('Valve tests', () => {
    const testConfiguration = [
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4],
        [1, 2, 3, 5],
        [1, 2, 3],
        [1, 2, 4, 5],
        // [1, 2, 4],
        [1, 2, 5],
        [1, 2],
        [1, 3, 4, 5],
        [1, 3, 4],
        [1, 3, 5],
        [1, 3],
        [1, 4, 5],
        [1, 4],
        [1, 5],
        [1],
        [2, 3, 4, 5],
        [2, 3, 4],
        [2, 3, 5],
        [2, 3],
        [2, 4, 5],
        [2, 4],
        [2, 5],
        [2],
        [3, 4, 5],
        [3, 4],
        [3, 5],
        [3],
        [4, 5],
        [4],
        [5],
        []
    ];
    test('Pipes should not light up using this combination', async ({ page }) => {
        await page.goto('https://testingmarathon.com/testing/WaterFlowSimulation/');
        await page.click('#valve1');
        await page.click('#valve2');
        await page.click('#valve4');
        await expect(page.locator('#pipe1')).toHaveClass('pipe');
        await expect(page.locator('#pipe2')).toHaveClass('pipe');
        await expect(page.locator('#pipe4')).toHaveClass('pipe');
    });

    test('Pipes should light up using this combination', async ({ page }) => {
        await page.goto('https://testingmarathon.com/testing/WaterFlowSimulation/');
        const pipesAndValves = [
            {
                valve: '#valve1',
                pipeClass: 'pipe active',
                pipe: '#pipe1'
            },
            {
                valve: '#valve4',
                pipeClass: 'pipe active',
                pipe: '#pipe4'
            },
            {
                valve: '#valve5',
                pipeClass: 'pipe active',
                pipe: '#pipe5'
            }
        ];
        for (const pipeAndValve of pipesAndValves) {
            await page.click(pipeAndValve.valve);
            await expect(page.locator(pipeAndValve.pipe)).toHaveClass(pipeAndValve.pipeClass);
        }
    });
    for (const testCase of testConfiguration) {
        test(`Should be able to turn on ${testCase.toString()} pipes`, async ({ page }) => {
            await page.goto('https://testingmarathon.com/testing/WaterFlowSimulation/');

            for (const pipes of testCase) {
                await page.click(`#valve${pipes}`);
            }
            for (const pipes of testCase) {
                await expect(page.locator(`#pipe${pipes}`)).toHaveClass('pipe active');
            }
        });
    }
});
