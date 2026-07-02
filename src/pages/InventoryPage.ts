import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly inventoryList: Locator;
  readonly inventoryItems: Locator;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.inventoryList = this.byTestId('inventory-list');
    this.inventoryItems = this.byTestId('inventory-item');
    this.cartBadge = this.byTestId('shopping-cart-badge');
    this.sortDropdown = this.byTestId('product-sort-container');
  }

  async addItemToCart(itemName: string): Promise<void> {
    const slug = itemName.toLowerCase().replace(/\s+/g, '-');
    await this.byTestId(`add-to-cart-${slug}`).click();
  }

  async getCartCount(): Promise<number> {
    if (!(await this.cartBadge.isVisible())) return 0;
    return Number(await this.cartBadge.textContent());
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async getItemNames(): Promise<string[]> {
    return this.byTestId('inventory-item-name').allTextContents();
  }

  async getItemPrices(): Promise<number[]> {
    const raw = await this.byTestId('inventory-item-price').allTextContents();
    return raw.map((p) => Number(p.replace('$', '')));
  }
}
