import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AuthPage extends BasePage {
    // Login form
    private readonly loginEmailInput = this.page.locator('[data-qa="login-email"]');
    private readonly loginPasswordInput = this.page.locator('[data-qa="login-password"]');
    private readonly loginButton = this.page.locator('[data-qa="login-button"]');
    private readonly loginErrorMsg = this.page.locator('p:text("Your email or password is incorrect!")');

    // Signup form
    private readonly signupNameInput = this.page.locator('[data-qa="signup-name"]');
    private readonly signupEmailInput = this.page.locator('[data-qa="signup-email"]');
    private readonly signupButton = this.page.locator('[data-qa="signup-button"]');

    constructor(page: Page) {
        super(page);
    }

    async verifyLoginPageVisible() {
        await expect(this.page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
    }

    async verifySignupPageVisible() {
        await expect(this.page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
    }

    async login(email: string, password: string) {
        await this.highlightAndFill(this.loginEmailInput, email);
        await this.highlightAndFill(this.loginPasswordInput, password);
        await this.highlightAndClick(this.loginButton, '#22c55e');
    }

    async fillSignupName(name: string) {
        await this.highlightAndFill(this.signupNameInput, name);
    }

    async fillSignupEmail(email: string) {
        await this.highlightAndFill(this.signupEmailInput, email);
    }

    async clickSignupButton() {
        await this.highlightAndClick(this.signupButton, '#22c55e');
    }

    async verifyLoginErrorVisible() {
        await expect(this.loginErrorMsg).toBeVisible();
    }

    async getLoginErrorText(): Promise<string> {
        return this.loginErrorMsg.innerText();
    }
}