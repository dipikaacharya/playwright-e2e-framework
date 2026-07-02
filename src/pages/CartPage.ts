import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = this.byTestId('inventory-item');
    this.checkoutButton = this.byTestId('checkout');
  }

  async open(): Promise<void> {
    await this.goto('/cart.html');
  }

  async getItemNames(): Promise<string[]> {
    return this.byTestId('inventory-item-name').allTextContents();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}

export class CheckoutPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly confirmationHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = this.byTestId('firstName');
    this.lastNameInput = this.byTestId('lastName');
    this.postalCodeInput = this.byTestId('postalCode');
    this.continueButton = this.byTestId('continue');
    this.finishButton = this.byTestId('finish');
    this.confirmationHeader = this.byTestId('complete-header');
  }

  async fillCustomerInfo(first: string, last: string, zip: string): Promise<void> {
    await this.firstNameInput.fill(first);
    await this.lastNameInput.fill(last);
    await this.postalCodeInput.fill(zip);
    await this.continueButton.click();
  }

  async finishOrder(): Promise<void> {
    await this.finishButton.click();
  }
}
