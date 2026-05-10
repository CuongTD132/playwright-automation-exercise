import { test, expect } from '@playwright/test';
import { HomePage } from '@pages/HomePage';
import { AuthPage } from '@pages/AuthPage';
import { INVALID_CREDENTIALS } from '@test-data/users';

test.describe('Task 5 — Negative Test Cases: Login @task5', () => {

    test('show error message when login with wrong password', async ({ page }) => {
        const homePage = new HomePage(page);
        const authPage = new AuthPage(page);

        await test.step('Step 1: Navigate to Login page', async () => {
            await homePage.goto();
            await homePage.clickSignupLogin();
            await authPage.verifyLoginPageVisible();
        });

        await test.step('Step 2: Login with wrong password', async () => {
            await authPage.login(
                INVALID_CREDENTIALS.email,
                INVALID_CREDENTIALS.wrongPassword
            );
        });

        await test.step('Step 3: Verify error message is visible', async () => {
            await authPage.verifyLoginErrorVisible();
        });

        await test.step('Step 4: Verify exact error text', async () => {
            const errorText = await authPage.getLoginErrorText();
            expect(errorText).toContain('Your email or password is incorrect!');
        });

        await test.step('Step 5: Verify still on login page', async () => {
            await expect(page).toHaveURL(/.*login/);
        });
    });

    test('show error when login with empty email', async ({ page }) => {
        const homePage = new HomePage(page);
        const authPage = new AuthPage(page);

        await homePage.goto();
        await homePage.clickSignupLogin();
        await authPage.login('', 'SomePassword123');

        await expect(page).toHaveURL(/.*login/);
    });

    test('show error when login with empty password', async ({ page }) => {
        const homePage = new HomePage(page);
        const authPage = new AuthPage(page);

        await homePage.goto();
        await homePage.clickSignupLogin();
        await authPage.login('someone@example.com', '');

        await expect(page).toHaveURL(/.*login/);
    });

    test('show error when login with invalid email format', async ({ page }) => {
        const homePage = new HomePage(page);
        const authPage = new AuthPage(page);

        await homePage.goto();
        await homePage.clickSignupLogin();
        await authPage.login('not-an-email', 'Password123');

        await expect(page).toHaveURL(/.*login/);
    });
});