import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ProductInfo } from './ProductsPage';

export class CartPage extends BasePage {
    private readonly cartTable = this.page.locator('#cart_info_table');
    private readonly cartRows = this.page.locator('#cart_info_table tbody tr');
    private readonly proceedToCheckoutBtn = this.page.getByText('Proceed To Checkout');

    constructor(page: Page) {
        super(page);
    }

    async goto() {
        await this.navigate('/view_cart');
    }

    async verifyCartPageVisible() {
        await expect(this.cartTable).toBeVisible();
    }

    async getCartItemCount(): Promise<number> {
        return this.cartRows.count();
    }

    async verifyProductInCart(product: ProductInfo) {
        const row = this.cartRows.filter({
            has: this.page.locator('.cart_description h4 a', { hasText: product.name }),
        });
        await expect(row).toBeVisible();

        // Verify price
        const priceCell = row.locator('.cart_price p');
        await expect(priceCell).toHaveText(product.price);

        // Verify quantity
        const quantityCell = row.locator('.cart_quantity button');
        await expect(quantityCell).toHaveText(String(product.quantity));
    }

    async getAllCartItems(): Promise<{ name: string; price: string; quantity: string; total: string }[]> {
        const count = await this.cartRows.count();
        const items = [];
        for (let i = 0; i < count; i++) {
            const row = this.cartRows.nth(i);
            items.push({
                name: await row.locator('.cart_description h4 a').innerText(),
                price: await row.locator('.cart_price p').innerText(),
                quantity: await row.locator('.cart_quantity button').innerText(),
                total: await row.locator('.cart_total p').innerText(),
            });
        }
        return items;
    }

    async clickProceedToCheckout() {
        await this.highlightAndClick(this.proceedToCheckoutBtn, '#22c55e');
    }
}