class DashboardPage {
  private get projectSelectorButton() {
    return $('[class*=projectSelector][class*=project-selector]:not([class*=mobile])');
  }

  async clickOnDashboard(dashboardName: string): Promise<void> {
    await $(`=${dashboardName}`).click();
  }

  async clickProjectsSelectorButton() {
    await this.projectSelectorButton.click();
  }

  async selectInProjectSelector(projectName: string) {
    await $(`[href*=${projectName}]`).click();
  }
}

export default new DashboardPage();
