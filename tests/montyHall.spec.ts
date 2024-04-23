import { test, expect } from '@playwright/test';

test.describe('Monty Hall', () => {
    test('Should win or loose when pressing first door 2 times', async ({ page }) => {
        await page.goto('https://testingmarathon.com/testing/MontyHall/');
        await page.click('#door1');
        await page.click('#door1');
        const resultText = await page.locator('#message').textContent();
        await expect(resultText).toMatch(/Sorry, the prize was behind door|Congratulations! You've found the prize!/);
    });

    test('Should win or loose when selecting other door', async ({ page }) => {
        await page.goto('https://testingmarathon.com/testing/MontyHall/');
        await page.click('#door1');

        const text = await page.locator('#message').textContent();
        const doors = text.split(' ');
        const openDoor = doors[1];
        let nextDoor = 2;
        if (parseInt(openDoor) == nextDoor) nextDoor = 3;
        await page.click(`#door${nextDoor}`);
        const resultText = await page.locator('#message').textContent();
        await expect(resultText).toMatch(/Sorry, the prize was behind door|Congratulations! You've found the prize!/);
    });

    test('Should be able to win 66.666% times when changing doors', async ({ page }) => {
        await page.goto('https://testingmarathon.com/testing/MontyHall/');
        for (let i = 0; i <= 100; i++) {
            await page.click('#door1');
            const text = await page.locator('#message').textContent();
            const doors = text.split(' ');
            const openDoor = doors[1];
            let nextDoor = 2;
            if (parseInt(openDoor) == nextDoor) nextDoor = 3;
            await page.click(`#door${nextDoor}`);
            const resultText = await page.locator('#message').textContent();
            await expect(resultText).toMatch(/Sorry, the prize was behind door|Congratulations! You've found the prize!/);
            await page.getByText('Restart Game').click();
        }
        console.log(await page.locator('#wins').textContent());
    });
    test('Should be able to win 30% times when changing doors', async ({ page }) => {
        await page.goto('https://testingmarathon.com/testing/MontyHall/');
        for (let i = 0; i <= 10; i++) {
            await page.click('#door1');
            await page.click('#door1');
            const resultText = await page.locator('#message').textContent();
            await expect(resultText).toMatch(/Sorry, the prize was behind door|Congratulations! You've found the prize!/);
            await page.getByText('Restart Game').click();
        }
        console.log(await page.locator('#wins').textContent());
    });
});
