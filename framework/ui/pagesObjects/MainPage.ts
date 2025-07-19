import BasePage from './BasePage';
import { Locator, Page } from '@playwright/test';

export class MainPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private readonly submitButton: Locator = this.page.locator('button[type=submit]');
  private readonly userNameField: Locator = this.page.locator('[placeholder=Login]');
  private readonly password: Locator = this.page.locator('[placeholder=Password]');

  async login(username: string, password: string): Promise<void> {
    await this.userNameField.fill(username, { timeout: 1000 });
    await this.password.fill(password, { timeout: 1000 });
    await this.submitButton.click();
  }
}
