import BasePage from './BasePage';
import { expect, Locator, Page } from '@playwright/test';

export class DashboardPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private readonly addDashboardButton: Locator = this.page.locator('[class*=add-dashboard]');
  private readonly spinnerLoaders: Locator = this.page.locator('[class*=spinningPreloader]');
  private readonly addNewWidgetButton: Locator = this.page.getByRole('button', { name: 'Add new widget' });
  private readonly widgetsHeaders: Locator = this.page.locator(
    "//*[contains(@class, 'widget-container')]//*[contains(@class, 'widget-name-block')]"
  );
  private readonly projectSelectorButton: Locator = this.page.locator(
    '[class*=projectSelector][class*=project-selector]:not([class*=mobile])'
  );

  async isAddDashboardButtonPresent(): Promise<boolean> {
    let isVisible = true;
    await this.addDashboardButton.waitFor({ state: 'visible', timeout: 5000 }).catch(() => (isVisible = false));

    return isVisible;
  }

  async clickOnDashboard(dashboardName: string): Promise<void> {
    await this.page.getByRole('link', { name: `${dashboardName}` }).click();
  }

  async clickOnAddNewWidget(): Promise<void> {
    await this.addNewWidgetButton.click();
  }

  async isTitlePresent(expectedTitle: string): Promise<boolean> {
    return await this.page.getByTitle(`${expectedTitle}`).isVisible();
  }

  async getWidgetHeaders(): Promise<string[]> {
    await this.widgetsHeaders.last().waitFor({ state: 'visible', timeout: 5000 });
    return await this.widgetsHeaders.allTextContents();
  }

  async clickProjectsSelectorButton() {
    await this.projectSelectorButton.click();
    return this;
  }

  async selectInProjectSelector(projectName: string) {
    await this.page.getByRole('link', { name: `${projectName}` }).click();
  }

  async waitForPreloaderDisappear() {
    await expect(this.spinnerLoaders).toHaveCount(0);
  }
}
