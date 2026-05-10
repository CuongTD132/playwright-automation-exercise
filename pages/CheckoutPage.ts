import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { UserData, PAYMENT_DATA } from '../test-data/users';

export class CheckoutPage extends BasePage {
    // Address section
    private readonly deliveryAddressSection = this.page.locator('#address_delivery');
    private readonly commentTextarea = this.page.locator('textarea[name="message"]');
    private readonly placeOrderBtn = this.page.getByRole('link', { name: 'Place Order' });

    // Payment section
    private readonly cardNameInput = this.page.locator('[data-qa="name-on-card"]');
    private readonly cardNumberInput = this.page.locator('[data-qa="card-number"]');
    private readonly cvcInput = this.page.locator('[data-qa="cvc"]');
    private readonly expiryMonthInput = this.page.locator('[data-qa="expiry-month"]');
    private readonly expiryYearInput = this.page.locator('[data-qa="expiry-year"]');
    private readonly payAndConfirmBtn = this.page.locator('[data-qa="pay-button"]');

    // Order success
    private readonly orderSuccessHeading = this.page.locator('[data-qa="order-placed"]');

    constructor(page: Page) {
        super(page);
    }

    async verifyDeliveryAddressContains(user: UserData) {
        const addressText = await this.deliveryAddressSection.innerText();
        expect(addressText).toContain(user.firstName);
        expect(addressText).toContain(user.lastName);
        expect(addressText).toContain(user.address1);
        expect(addressText).toContain(user.city);
        expect(addressText).toContain(user.state);
        expect(addressText).toContain(user.zipcode);
    }

    async addOrderComment(comment: string = 'Automated test order - please ignore.') {
        await this.highlightAndFill(this.commentTextarea, comment);
    }

    async clickPlaceOrder() {
        await this.highlightAndClick(this.placeOrderBtn, '#22c55e');
    }

    async fillPaymentDetails() {
        await this.highlightAndFill(this.cardNameInput, PAYMENT_DATA.cardName);
        await this.highlightAndFill(this.cardNumberInput, PAYMENT_DATA.cardNumber);
        await this.highlightAndFill(this.cvcInput, PAYMENT_DATA.cvc);
        await this.highlightAndFill(this.expiryMonthInput, PAYMENT_DATA.expiryMonth);
        await this.highlightAndFill(this.expiryYearInput, PAYMENT_DATA.expiryYear);
    }

    async clickPayAndConfirm() {
        await this.highlightAndClick(this.payAndConfirmBtn, '#22c55e');
    }

    async verifyOrderPlacedSuccessfully() {
        await expect(this.orderSuccessHeading).toHaveText('Order Placed!');
        await expect(
            this.page.getByText('Congratulations! Your order has been confirmed!')
        ).toBeVisible();
    }
}