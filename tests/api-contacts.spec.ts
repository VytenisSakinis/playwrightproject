import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { Contacts } from '../api/contacts';

test.describe('should', () => {
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
                id: faker.internet.exampleEmail()
            }
        ]
    };

    test('Should be able to create contact', async ({}) => {
        const response = await Contacts.createContact(contact);
        expect(response.status()).toEqual(200);
        expect((await response.json()).email).toEqual(contact.identifiers[0].id);
    });

    test('Should be able to create contact with an email', async ({}) => {
        const response = await Contacts.createContactByEmail(contact.identifiers[0].id);
        expect(response.status()).toEqual(200);
        expect((await response.json()).email).toEqual(contact.identifiers[0].id);
    });
    test('Should not be able to create contact with an email', async ({}) => {
        const response = await Contacts.createContactByEmail('sigis');
        expect(response.status()).toEqual(400);
    });

    test('Should be able to get contacts', async ({}) => {
        const response = await Contacts.shouldBeAbleToGetContacts(undefined, 10);
        expect(response.status()).toEqual(200);
        expect((await response.json()).contacts).toHaveLength(10);
    });
    test('Should be able to get contact by contact ID', async ({}) => {
        let contactID: string;

        await test.step('get contact by id', async () => {
            const response = await Contacts.shouldBeAbleToGetContacts(undefined, 1);
            contactID = (await response.json()).contacts[0].contactID;
        });
        await test.step('get contact by id', async () => {
            const response = await Contacts.getContactByID(contactID);
            expect(response.status()).toEqual(200);
            expect((await response.json()).contactID).toEqual(contactID);
        });
    });

    test('Should be able to get contact by email', async ({}) => {
        let contactEmail: string;
        await test.step('get contact by id', async () => {
            const response = await Contacts.shouldBeAbleToGetContacts(undefined, 1);
            contactEmail = (await response.json()).contacts[0].email;
        });

        await test.step('get contact by id', async () => {
            const response = await Contacts.shouldBeAbleToGetContacts(contactEmail, 1);
            expect(response.status()).toEqual(200);
            expect((await response.json()).contacts[0].email).toEqual(contactEmail);
        });
    });

    test('Should be able to update contact', async ({}) => {
        let contactID: string;
        let contactEmail: string;

        await test.step('createContact', async () => {
            const response = await Contacts.createContactByEmail(faker.internet.exampleEmail());

            contactID = (await response.json()).contactID;
            contactEmail = (await response.json()).email;
        });

        await test.step('update contact', async () => {
            const contacts = {
                contactID: contactID,
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
                        id: contactEmail.toLowerCase()
                    }
                ]
            };
            const response = await Contacts.updateContact(contactID, contacts);
            expect(response.status()).toEqual(200);
            expect((await response.json()).firstName).toEqual(contacts.firstName);
        });
    });
});
