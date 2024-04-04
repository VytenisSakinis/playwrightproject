import { test, expect } from '@playwright/test';
import { USER } from '../test-data';
import { Login } from '../page/contacts';

test.describe('testingmarathon tests', () => {
    let login: Login;
    test.beforeEach(async ({ page }) => {
        await page.goto('/register');
        login = new Login(page);
    });

    test('Should be able to log in', async ({ page }) => {
        await login.login(`${USER.username}`, `${USER.password}`);
        await expect(page).toHaveTitle(/Web Client | WebIssues/);
        await expect(page.getByText('Log Out')).toBeVisible();
        await expect(page.getByText('Log Out')).toContainText('Log Out');
    });

    test('Should not be able to log in with invalid username', async ({ page }) => {
        await login.login(`invalid`, `${USER.password}`);
        await expect(page.getByText('Incorrect value: Invalid login or password.')).toBeVisible();
    });

    test('Should not be able to log in with invalid password', async ({ page }) => {
        await login.login(`${USER.username}`, `invalid`);
        await expect(page.getByText('Incorrect value: Invalid login or password.')).toBeVisible();
    });

    test('Should not be able to log in with empty username', async ({ page }) => {
        await login.login(``, `invalid`);
        await expect(page.getByText('Incorrect value: Required value is missing.')).toBeVisible();
    });
});
