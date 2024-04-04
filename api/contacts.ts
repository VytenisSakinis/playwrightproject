import { request } from '@playwright/test';
import { API } from '../test-data';
import { faker } from '@faker-js/faker';

export class Contacts {
    static async createContact(contact) {
        const context = await request.newContext();

        return await context.post(`${API.url}/v3/contacts`, {
            data: contact
        });
    }

    static async createContactByEmail(email) {
        const contact = {
            firstName: faker.person.firstName('female'),
            lastName: faker.person.lastName('female'),
            gender: 'f',
            identifiers: [
                {
                    type: 'email',
                    channels: {
                        email: {
                            status: 'subscribed'
                        }
                    },
                    id: email
                }
            ]
        };

        return await this.createContact(contact);
    }

    static async shouldBeAbleToGetContacts(email, limit) {
        const context = await request.newContext();
        let searchParams = `limit=${limit}`;
        if (email) {
            searchParams += `&email=${email}`;
        }

        return await context.get(`${API.url}/v3/contacts?${searchParams}`);
    }

    static async getContactByID(contactID) {
        const context = await request.newContext();
        return await context.get(`${API.url}/v3/contacts/${contactID}`);
    }

    static async updateContact(contactID, contact) {
        const context = await request.newContext();
        return await context.patch(`${API.url}/v3/contacts/${contactID}`, {
            data: contact
        });
    }
}
