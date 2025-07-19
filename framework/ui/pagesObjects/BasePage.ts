import { Locator, Page } from '@playwright/test';

export default class BasePage {
  protected readonly page: Page;

  protected readonly dashboardsMenu: Locator;

  constructor(page: Page) {
    this.page = page;
  }

  async clickOnMenu(menu: string): Promise<void> {
    await this.page
      .getByRole('link')
      .filter({ hasText: `${menu}` })
      .click();
  }

  getPage(): Page {
    return this.page;
  }
}
