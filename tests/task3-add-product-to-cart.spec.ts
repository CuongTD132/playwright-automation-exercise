import { test, expect } from '@playwright/test';
import { HomePage } from '@pages/HomePage';
import { ProductsPage, ProductInfo } from '@pages/ProductsPage';
import { CartPage } from '@pages/CartPage';

test.describe('Task 3 — Add Product To Cart @task3', () => {

    test('add 2 products to cart and verify product details', async ({ page }) => {
        const homePage = new HomePage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const addedProducts: ProductInfo[] = [];

        await test.step('Step 1: Open homepage', async () => {
            await homePage.goto();
            await expect(page).toHaveURL('/');
        });

        await test.step('Step 2: Navigate to Products page', async () => {
            await productsPage.goto();
            await productsPage.verifyProductsPageVisible();
        });

        await test.step('Step 3: Add first product → Continue Shopping', async () => {
            const product1 = await productsPage.addProductToCartByIndex(1);
            addedProducts.push(product1);
            await productsPage.handleCartModal(true);
        });

        await test.step('Step 4: Add second product → View Cart', async () => {
            const product2 = await productsPage.addProductToCartByIndex(2);
            addedProducts.push(product2);
            await productsPage.handleCartModal(false);
        });

        await test.step('Step 5: Verify cart contains exactly 2 items', async () => {
            await cartPage.verifyCartPageVisible();
            const itemCount = await cartPage.getCartItemCount();
            expect(itemCount).toBe(2);
        });

        await test.step('Step 6: Verify Name, Price, Quantity for each product', async () => {
            for (const product of addedProducts) {
                await cartPage.verifyProductInCart(product);
            }
        });
    });
});