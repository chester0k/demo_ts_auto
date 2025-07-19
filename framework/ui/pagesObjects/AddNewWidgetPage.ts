import BasePage from './BasePage';
import { Locator, Page } from '@playwright/test';

export class AddNewWidgetPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private readonly nextStepButton: Locator = this.page.getByRole('button', { name: 'Next step' });
  private readonly addButton: Locator = this.page.getByRole('button', { name: 'Add', exact: true });
  private readonly widgetNameInput: Locator = this.page.getByPlaceholder('Enter widget name');

  async selectWidgetType(value: string): Promise<void> {
    await this.page
      .locator('label')
      .filter({ hasText: `${value}` })
      .locator('span')
      .first()
      .click();
  }

  async clickNextStepButton(): Promise<void> {
    await this.nextStepButton.click();
  }

  async selectConfigureWidgetFilter(value: string): Promise<void> {
    await this.page
      .locator('label')
      .filter({ hasText: `${value}` })
      .locator('span')
      .first()
      .click();
  }

  async enterWidgetName(value: string): Promise<void> {
    await this.widgetNameInput.fill(value);
  }

  async clickAddWidgetButton() {
    await this.addButton.click();
  }
}
