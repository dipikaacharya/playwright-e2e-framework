import { Page, Locator } from '@playwright/test';

/**
 * BasePage — shared behaviour for all page objects.
 * Every page object extends this class so common actions
 * (navigation, waiting) live in one place.
 */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path: string = '/'): Promise<void> {
    await this.page.goto(path);
  }

  async title(): Promise<string> {
    return this.page.title();
  }

  protected byTestId(testId: string): Locator {
    return this.page.locator(`[data-test="${testId}"]`);
  }
}
