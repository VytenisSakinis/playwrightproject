import { test, expect } from '@playwright/test';

test.describe('testingmarathon tests', () => {
    test('Escape the code escape room', async ({ page }) => {
        const answers = [
            {
                answer: `var greeting = 'Hello, world!';`,
                locator: '#answer1',
                button: '#button1',
                resultLocator: '#result1'
            },
            {
                answer: 'function isEven(num) { return num % 2 == 0; }',
                locator: '#answer2',
                button: '#button2',
                resultLocator: '#result2'
            },
            {
                answer: 'string',
                locator: '#answer3',
                button: '#button3',
                resultLocator: '#result3'
            },
            {
                answer: '200',
                locator: '#answer4',
                button: '#button4',
                resultLocator: '#result4'
            },
            {
                answer: `expect(contact.firstName).toEqual('Jonas');`,
                locator: '#answer5',
                button: '#button5',
                resultLocator: '#result5'
            },
            {
                answer: `const contact = new Contacts();`,
                locator: '#answer6',
                button: '#button6',
                resultLocator: '#result6'
            },
            {
                answer: `httpOnly: true`,
                locator: '#answer7',
                button: '#button7',
                resultLocator: '#result7'
            },
            {
                answer: `secure: true`,
                locator: '#answer8',
                button: '#button8',
                resultLocator: '#result8'
            },
            {
                answer: `//button[@data-tid="add-contacts-button"]`,
                locator: '#answer9',
                button: '#button9',
                resultLocator: '#result9'
            },
            {
                answer: `404`,
                locator: '#answer10',
                button: '#button10',
                resultLocator: '#result10'
            }
        ];
        await page.goto('https://testingmarathon.com/testing/EscapeRoom/');
        for (const answer of answers) {
            await page.fill(answer.locator, answer.answer);
            await page.click(answer.button);
            await expect(page.locator(answer.resultLocator)).toContainText('Correct! The box is unlocked.');
        }
    });
});
