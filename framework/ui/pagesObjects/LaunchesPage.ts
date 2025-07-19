import BasePage from './BasePage';
import { Page } from '@playwright/test';

export class LaunchesPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private readonly cellTitles = this.page.locator('[class^=headerCell__title-short]');

  async getCellTitles(): Promise<string[]> {
    await this.cellTitles.last().waitFor({ state: 'visible' });
    return await this.cellTitles.allInnerTexts();
  }
}
