import {expect, Page} from "@playwright/test";
import {BasePage} from "./BasePage";

export class HomePage extends BasePage {
    private readonly signupLoginLink = this.page.getByRole('link', {name: ' Signup / Login'});
    private readonly logoutLink = this.page.getByRole('link', {name: ' Logout'});
    private readonly deleteAccountLink = this.page.getByRole('link', {name: ' Delete Account'});
    private readonly cartLink = this.page.getByRole('link', {name: ' Cart'});
    private readonly loggedInUserText = this.page.locator('li a b');
    private readonly homePageSlider = this.page.locator('#slider');

    constructor(page: Page) {
        super(page);
    }

    async goto() {
        await this.navigate('/');
    }

    async clickSignupLogin() {
        await this.highlightAndClick(this.signupLoginLink);
    }

    async clickLogout() {
        await this.highlightAndClick(this.logoutLink);
    }

    async clickDeleteAccount() {
        await this.highlightAndClick(this.deleteAccountLink, '#ef4444'); // đỏ = nguy hiểm
    }

    async clickCart() {
        await this.highlightAndClick(this.cartLink);
    }

    async verifyHomePageVisible() {
        await expect(this.homePageSlider).toBeVisible();
    }

    async verifyLoggedInAs(username: string) {
        await expect(this.loggedInUserText).toHaveText(username);
    }
    async isUserLoggedIn(){
        return this.logoutLink.isVisible();
    }
}