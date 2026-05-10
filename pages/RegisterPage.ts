import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { UserData } from '../test-data/users';

export class RegisterPage extends BasePage {
    // Account Information
    private readonly titleMrRadio = this.page.locator('#id_gender1');
    private readonly passwordInput = this.page.locator('[data-qa="password"]');
    private readonly daySelect = this.page.locator('[data-qa="days"]');
    private readonly monthSelect = this.page.locator('[data-qa="months"]');
    private readonly yearSelect = this.page.locator('[data-qa="years"]');
    private readonly newsletterCheckbox = this.page.locator('#newsletter');
    private readonly offersCheckbox = this.page.locator('#optin');

    // Address Information
    private readonly firstNameInput = this.page.locator('[data-qa="first_name"]');
    private readonly lastNameInput = this.page.locator('[data-qa="last_name"]');
    private readonly companyInput = this.page.locator('[data-qa="company"]');
    private readonly address1Input = this.page.locator('[data-qa="address"]');
    private readonly address2Input = this.page.locator('[data-qa="address2"]');
    private readonly countrySelect = this.page.locator('[data-qa="country"]');
    private readonly stateInput = this.page.locator('[data-qa="state"]');
    private readonly cityInput = this.page.locator('[data-qa="city"]');
    private readonly zipcodeInput = this.page.locator('[data-qa="zipcode"]');
    private readonly mobileNumberInput = this.page.locator('[data-qa="mobile_number"]');
    private readonly createAccountButton = this.page.locator('[data-qa="create-account"]');

    // Confirmation
    private readonly accountCreatedHeading = this.page.locator('[data-qa="account-created"]');
    private readonly continueButton = this.page.locator('[data-qa="continue-button"]');

    constructor(page: Page) {
        super(page);
    }

    async verifyEnterAccountInfoVisible() {
        await expect(
            this.page.getByRole('heading', { name: 'Enter Account Information' })
        ).toBeVisible();
    }

    async fillAccountInformation(user: UserData) {
        await this.highlightAndClick(this.titleMrRadio, '#a855f7');
        await this.highlightAndFill(this.passwordInput, user.password);
        await this.daySelect.selectOption(user.birthDay);
        await this.monthSelect.selectOption(user.birthMonth);
        await this.yearSelect.selectOption(user.birthYear);
        await this.highlightAndClick(this.newsletterCheckbox, '#06b6d4');
        await this.highlightAndClick(this.offersCheckbox, '#06b6d4');
    }

    async fillAddressInformation(user: UserData) {
        await this.highlightAndFill(this.firstNameInput, user.firstName);
        await this.highlightAndFill(this.lastNameInput, user.lastName);
        if (user.company) {
            await this.highlightAndFill(this.companyInput, user.company);
        }
        await this.highlightAndFill(this.address1Input, user.address1);
        if (user.address2) {
            await this.highlightAndFill(this.address2Input, user.address2);
        }
        await this.countrySelect.selectOption(user.country);
        await this.highlightAndFill(this.stateInput, user.state);
        await this.highlightAndFill(this.cityInput, user.city);
        await this.highlightAndFill(this.zipcodeInput, user.zipcode);
        await this.highlightAndFill(this.mobileNumberInput, user.mobileNumber);
    }

    async clickCreateAccount() {
        await this.highlightAndClick(this.createAccountButton, '#22c55e');
    }

    async verifyAccountCreated() {
        await expect(this.accountCreatedHeading).toHaveText('Account Created!');
    }

    async clickContinue() {
        await this.continueButton.click();
    }
}