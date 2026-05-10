import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { AuthPage } from '../pages/AuthPage';
import { RegisterPage } from '../pages/RegisterPage';
import { generateUser } from '../test-data/users';
import { saveTestUser } from '../utils/testState';

test.describe('Task 1 — Register User @task1', () => {

    test('register a new user account successfully', async ({ page }) => {
        const user = generateUser();
        const homePage = new HomePage(page);
        const authPage = new AuthPage(page);
        const registerPage = new RegisterPage(page);

        await test.step('Step 1: Open homepage', async () => {
            await homePage.goto();
            await expect(page).toHaveURL('/');
        });

        await test.step('Step 2: Navigate to Signup/Login page', async () => {
            await homePage.clickSignupLogin();
            await authPage.verifyLoginPageVisible();
            await authPage.verifySignupPageVisible();
        });

        await test.step('Step 3: Fill signup form and submit', async () => {
            await authPage.fillSignupName(user.name);
            await authPage.fillSignupEmail(user.email);
            await authPage.clickSignupButton();
        });

        await test.step('Step 4: Fill account info and address', async () => {
            await registerPage.verifyEnterAccountInfoVisible();
            await registerPage.fillAccountInformation(user);
            await registerPage.fillAddressInformation(user);
            await registerPage.clickCreateAccount();
        });

        await test.step('Step 5: Verify account created successfully', async () => {
            await registerPage.verifyAccountCreated();
            await registerPage.clickContinue();
        });

        await test.step('Step 6: Verify logged in with correct username', async () => {
            await homePage.verifyLoggedInAs(user.name);
            // Save information for later tests
            saveTestUser(user);
        });

        await test.step('Step 7: Logout', async () => {
            await homePage.clickLogout();
            await authPage.verifyLoginPageVisible();
        });
    });
});