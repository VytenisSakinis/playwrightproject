import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { Segments } from '../app-api/segments';
import { Contacts } from '../api/contacts';

const email = faker.internet.email();

const segment = {
    name: `Segement with email ${email}`,
    filters: {
        type: 'group',
        group: {
            junction: 'or',
            members: [
                {
                    type: 'group',
                    group: {
                        junction: 'and',
                        members: [
                            {
                                type: 'group',
                                group: {
                                    junction: 'and',
                                    members: [
                                        {
                                            type: 'rule',
                                            rule: {
                                                resourceType: 'contacts',
                                                filter: {
                                                    filterType: 'junction',
                                                    junction: 'and',
                                                    filters: [
                                                        {
                                                            filterType: 'filter',
                                                            filterValue: {
                                                                operator: 'eq',
                                                                valueType: 'string_list',
                                                                value: {
                                                                    operator: 'any',
                                                                    values: [`${email}`]
                                                                },
                                                                property: 'email'
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            ]
        }
    }
};

let segmentID: string;
let contactID: string;

test.describe('should', () => {
    test.afterAll(async ({}) => {
        await Segments.delete(segmentID);
        await Segments.deleteContact(contactID);
    });
    test('Should be able to log in', async ({}) => {
        const contact = await Contacts.createContactByEmail(email);
        expect((await contact.json()).email).toEqual(email);
        contactID = (await contact.json()).contactID;
        const response = await Segments.create(segment);
        expect(response.status()).toEqual(200);
        segmentID = (await response.json()).data.segmentID;
        await expect
            .poll(
                async () => {
                    const responseSegment = await Segments.get(segmentID, email);
                    return JSON.stringify(await responseSegment.json());
                },
                {
                    timeout: 30000
                }
            )
            .toContain(email.toLowerCase());
    });
});
