import { test, expect } from '@playwright/test';
import { Calculate } from '../api/calculator';

test.describe('should be able to calculate', () => {
    test('Should be able to divide 2 numbers', async ({}) => {
        const response = await (await Calculate.calculate(200, 2, 'divide')).json();
        console.log(response);
        expect(response.result).toEqual(100);
    });
    test('Should be able to add 2 numbers', async ({}) => {
        const response = await (await Calculate.calculate(200, 50, 'add')).json();
        console.log(response);
        expect(response.result).toEqual(250);
    });
    test('Should be able to multiply 2 numbers', async ({}) => {
        const response = await (await Calculate.calculate(200, 2, 'multiply')).json();
        console.log(response);
        expect(response.result).toEqual(400);
    });
    test('Should be able to subtract 2 numbers', async ({}) => {
        const response = await (await Calculate.calculate(200, 100, 'subtract')).json();
        console.log(response);
        expect(response.result).toEqual(100);
    });
    // pasidaryt parametrizuota testa
});
