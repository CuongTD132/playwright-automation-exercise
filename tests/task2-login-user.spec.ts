import { test, expect } from '@playwright/test';
import { HomePage } from '@pages/HomePage';
import { AuthPage } from '@pages/AuthPage';
import { loadTestUser } from '@utils/testState';

test.describe('Task 2 — Login User @task2', () => {

    test('login with created account and verify username', async ({ page }) => {
        const user = loadTestUser();
        const homePage = new HomePage(page);
        const authPage = new AuthPage(page);

        await test.step('Step 1: Open homepage', async () => {
            await homePage.goto();
            await expect(page).toHaveURL('/');
        });

        await test.step('Step 2: Navigate to Login page', async () => {
            await homePage.clickSignupLogin();
            await authPage.verifyLoginPageVisible();
        });

        await test.step('Step 3: Login with created account', async () => {
            await authPage.login(user.email, user.password);
        });

        await test.step('Step 4: Verify login success', async () => {
            await expect(page).not.toHaveURL(/.*login/);
        });

        await test.step('Step 5: Verify username displayed correctly', async () => {
            await homePage.verifyLoggedInAs(user.name);
        });

        await test.step('Step 6: Logout', async () => {
            await homePage.clickLogout();
            await authPage.verifyLoginPageVisible();
        });
    });
});