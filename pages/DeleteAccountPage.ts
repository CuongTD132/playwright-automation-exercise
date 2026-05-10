import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DeleteAccountPage extends BasePage {
    private readonly accountDeletedHeading = this.page.locator('[data-qa="account-deleted"]');
    private readonly continueButton = this.page.locator('[data-qa="continue-button"]');

    constructor(page: Page) {
        super(page);
    }

    async verifyAccountDeleted() {
        await expect(this.accountDeletedHeading).toHaveText('Account Deleted!');
    }

    async clickContinue() {
        await this.continueButton.click();
    }
}