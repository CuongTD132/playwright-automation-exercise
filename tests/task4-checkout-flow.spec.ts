import { test } from '@playwright/test';
import { HomePage } from '@pages/HomePage';
import { AuthPage } from '@pages/AuthPage';
import { ProductsPage } from '@pages/ProductsPage';
import { CartPage } from '@pages/CartPage';
import { CheckoutPage } from '@pages/CheckoutPage';
import { DeleteAccountPage } from '@pages/DeleteAccountPage';
import { loadTestUser } from '@utils/testState';

test.describe('Task 4 — Checkout Flow @task4', () => {

    test('complete checkout flow and verify order placed successfully', async ({ page }) => {
        const user = loadTestUser();
        const homePage = new HomePage(page);
        const authPage = new AuthPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const deleteAccountPage = new DeleteAccountPage(page);

        await test.step('Step 1: Login with created account', async () => {
            await homePage.goto();
            await homePage.clickSignupLogin();
            await authPage.login(user.email, user.password);
            await homePage.verifyLoggedInAs(user.name);
        });

        await test.step('Step 2: Add product to cart', async () => {
            await productsPage.goto();
            await productsPage.addProductToCartByIndex(1);
            await productsPage.handleCartModal(false);
        });

        await test.step('Step 3: Verify cart and proceed to checkout', async () => {
            await cartPage.verifyCartPageVisible();
            await cartPage.clickProceedToCheckout();
        });

        await test.step('Step 4: Verify delivery address', async () => {
            await checkoutPage.verifyDeliveryAddressContains(user);
        });

        await test.step('Step 5: Add comment and place order', async () => {
            await checkoutPage.addOrderComment();
            await checkoutPage.clickPlaceOrder();
        });

        await test.step('Step 6: Fill payment details', async () => {
            await checkoutPage.fillPaymentDetails();
            await checkoutPage.clickPayAndConfirm();
        });

        await test.step('Step 7: Verify order placed successfully', async () => {
            await checkoutPage.verifyOrderPlacedSuccessfully();
        });

        await test.step('Cleanup: Delete test account', async () => {
            await homePage.goto();
            await homePage.clickDeleteAccount();
            await deleteAccountPage.verifyAccountDeleted();
        });
    });
});