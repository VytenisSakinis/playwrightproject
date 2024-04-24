import { request } from '@playwright/test';
import { URL } from '../test-data';

export class Calculate {
    static async calculate(num1: number, num2: number, operator: string, failOnStatusCode = true) {
        const context = await request.newContext();

        return await context.post(`${URL}/testing/calculate/`, {
            data: {
                num1: num1,
                num2: num2,
                operation: operator
            },
            headers: {
                apikey: 'WSDFGHJIUYTWSDFGHHGFDW'
            },
            failOnStatusCode: failOnStatusCode
        });
    }
}
