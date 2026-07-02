import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage, CheckoutPage } from '../pages/CartPage';
import { users } from '../data/users';

/**
 * Custom fixtures.
 * - Page objects are injected into tests (no `new XPage(page)` noise in specs).
 * - `loggedIn` performs authentication once per test that requests it.
 */
type Fixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  loggedIn: void;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  inventoryPage: async ({ page }, use) => use(new InventoryPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),

  loggedIn: async ({ loginPage }, use) => {
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
    await use();
  },
});

export { expect } from '@playwright/test';
