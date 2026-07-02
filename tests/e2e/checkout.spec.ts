import { test, expect } from '../../src/fixtures/test-fixtures';
import { products, checkoutCustomer } from '../../src/data/users';

test.describe('Cart & Checkout', () => {
  test('user can add items and complete checkout @smoke', async ({
    loggedIn,
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    await inventoryPage.addItemToCart(products.backpack);
    await inventoryPage.addItemToCart(products.bikeLight);
    expect(await inventoryPage.getCartCount()).toBe(2);

    await cartPage.open();
    expect(await cartPage.getItemNames()).toEqual([products.backpack, products.bikeLight]);

    await cartPage.proceedToCheckout();
    await checkoutPage.fillCustomerInfo(
      checkoutCustomer.firstName,
      checkoutCustomer.lastName,
      checkoutCustomer.postalCode,
    );
    await checkoutPage.finishOrder();

    await expect(checkoutPage.confirmationHeader).toHaveText('Thank you for your order!');
  });

  test('products sort low-to-high by price @regression', async ({ loggedIn, inventoryPage }) => {
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getItemPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });
});
