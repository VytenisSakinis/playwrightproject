import { request } from '@playwright/test';
import { APP_URL } from '../test-data';

export class Segments {
    static async create(segment: object, failOnStatusCode = true) {
        const context = await request.newContext();
        return await context.post(`${APP_URL}/REST/segments/v2/segments`, {
            data: segment,
            failOnStatusCode: failOnStatusCode
        });
    }
    static async get(segmentID: string, search: string, failOnStatusCode = true) {
        const context = await request.newContext();
        return await context.get(`${APP_URL}/REST/contacts/v2/contacts?segmentID=${segmentID}&search=${search}`, {
            failOnStatusCode: failOnStatusCode
        });
    }
    static async delete(segmentID: string, failOnStatusCode = true) {
        const context = await request.newContext();
        return await context.delete(`${APP_URL}/REST/segments/v1/segments/${segmentID}`, {
            failOnStatusCode: failOnStatusCode
        });
    }
    static async deleteContact(contactID: string, failOnStatusCode = true) {
        const context = await request.newContext();
        return await context.post(`${APP_URL}/REST/contactsDelete/v1/createBatchDelete`, {
            data: { contactIDs: [`${contactID}`] },
            failOnStatusCode: failOnStatusCode
        });
    }
}
