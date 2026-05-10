import {expect, Page} from '@playwright/test';
import {BasePage} from './BasePage';

export interface ProductInfo {
    name: string;
    price: string;
    quantity: number;
}

export class ProductsPage extends BasePage {
    private readonly productList = this.page.locator('.features_items .product-image-wrapper');

    constructor(page: Page) {
        super(page);
    }

    async goto() {
        await this.navigate('/products');
    }

    async verifyProductsPageVisible() {
        await expect(
            this.page.getByRole('heading', {name: 'All Products'})
        ).toBeVisible();
    }

    /**
     * Thêm sản phẩm vào cart theo index (bắt đầu từ 1)
     * Hover vào product card để hiện nút "Add to cart"
     */
    async addProductToCartByIndex(index: number): Promise<ProductInfo> {
        const productCard = this.productList.nth(index - 1);
        await this.scrollToElement(productCard);

        // Lấy thông tin sản phẩm trước khi add
        const name = await productCard.locator('.productinfo p').innerText();
        const price = await productCard.locator('.productinfo h2').innerText();

        // Hover để hiện nút Add to cart
        await productCard.hover();
        await this.highlightAndClick(
            productCard.locator('.product-overlay .add-to-cart'),
            '#22c55e'
        );

        return {
            name: name.trim(),
            price: price.trim(),
            quantity: 1,
        };
    }

    /**
     * Xử lý modal sau khi add sản phẩm
     * @param clickContinue - true: tiếp tục mua, false: xem giỏ hàng
     */
    async handleCartModal(clickContinue: boolean = true) {
        const modal = this.page.locator('#cartModal');
        await expect(modal).toBeVisible();

        if (clickContinue) {
            await modal.getByRole('button', {name: 'Continue Shopping'}).click();
            await expect(modal).toBeHidden();
        } else {
            await modal.getByRole('link', {name: 'View Cart'}).click();
        }
    }
}