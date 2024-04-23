import { test, expect } from '@playwright/test';
import { USER } from '../test-data';
import { faker } from '@faker-js/faker';
import { Login, Issue } from '../page/contacts';

test.describe('Issue creation', () => {
    let login: Login;
    let issue: Issue;
    const userData = {
        randomName: faker.person.firstName(),
        loremIpsum: faker.lorem.paragraph(3)
    };
    test.beforeEach(async ({ page }) => {
        login = new Login(page);
        issue = new Issue(page);
        await page.goto('/register');
        await expect(page).toHaveTitle(/Web Client | WebIssues/);
        await login.login(`${USER.username}`, `${USER.password}`);
        await page.goto('/register/client/index.php?folder=1');
    });

    test('Should be able to create issue', async ({ page }) => {
        await issue.createIssue(`${userData.randomName}`, `${userData.loremIpsum}`);
        await expect(page).toHaveTitle(/Web Client | WebIssues/);
    });

    test('Shouldnt be able to create issue with empty name', async ({ page }) => {
        await issue.createIssue('', `${userData.loremIpsum}`);
        await expect(page.getByText('Some of the values you entered are incorrect.')).toBeVisible();
    });

    test('Should be able to create an and delete it instantly', async ({ page }) => {
        const issueNameStatic = userData.randomName;
        await issue.createIssue(`${issueNameStatic}`, `${userData.loremIpsum}`);
        await issue.deleteIssueAfterCreation();
        await expect(page.getByText(`${issueNameStatic}`)).toBeHidden();
    });

    test('Should be able to create, search for the created issue and delete it', async ({ page }) => {
        const issueNameStatic = userData.randomName;
        await issue.createIssue(`${issueNameStatic}`, `${userData.loremIpsum}`);
        await issue.deleteIssueBySearchingForIssue(`${issueNameStatic}`);
        await expect(page.getByText(`${issueNameStatic.toLowerCase()}`)).toBeVisible();
    });

    test('Should be able to search by name', async ({ page }) => {
        await issue.searchByUserName('vytenis.sakinis@gmail.com');
        await expect(page).toHaveTitle(/Web Client | WebIssues/);
    });
});
