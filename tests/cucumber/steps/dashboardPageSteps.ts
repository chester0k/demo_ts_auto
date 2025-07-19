import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { firstUser, testApplication, secondUser } from '../hooks';
import { ICustomWorld } from '../CustomWorld';

Then(/^'Add dashboard' button (is|is not) displayed/, async function (state) {
  const isDisplayed = !state.includes('not');
  expect(await testApplication.dashboardPage.isAddDashboardButtonPresent()).toEqual(isDisplayed);
});

When('User selects project {string} on dashboard page', async (projectName) => {
  await testApplication.dashboardPage.clickProjectsSelectorButton();
  projectName = projectName.includes('process.') ? eval(projectName) : projectName;
  await testApplication.dashboardPage.selectInProjectSelector(projectName);
});

When('First User selects project {string} on dashboard page', async (projectName) => {
  await firstUser.dashboardPage.clickProjectsSelectorButton();
  projectName = projectName.includes('process.') ? eval(projectName) : projectName;
  await firstUser.dashboardPage.selectInProjectSelector(projectName);
});

When('Second User selects project {string} on dashboard page', async (projectName) => {
  await secondUser.dashboardPage.clickProjectsSelectorButton();
  projectName = projectName.includes('process.') ? eval(projectName) : projectName;
  await secondUser.dashboardPage.selectInProjectSelector(projectName);
});

When('User clicks on dashboard {string}', async (dashboardName) => {
  await testApplication.dashboardPage.clickOnDashboard(dashboardName);
});

When('First User clicks on dashboard {string}', async (dashboardName) => {
  await firstUser.dashboardPage.clickOnDashboard(dashboardName);
});

When('First User clicks Add New Widget button', async () => {
  await firstUser.dashboardPage.clickOnAddNewWidget();
});

When('First User selects widget type {string}', async (widgetType: string) => {
  await firstUser.addNewWidgetPage.selectWidgetType(widgetType);
});
When('First User clicks Widget Next button', async () => {
  await firstUser.addNewWidgetPage.clickNextStepButton();
});

When('First User selects configuration widget filter {string}', async (widgetFilter: string) => {
  await firstUser.addNewWidgetPage.selectConfigureWidgetFilter(widgetFilter);
});

When('First User enters widget name {string}', async function (this: ICustomWorld, widgetName: string) {
  widgetName = widgetName + ' ' + Math.random() * 10;
  await firstUser.addNewWidgetPage.enterWidgetName(widgetName);
  this.scenarioContext.set('widgetName', widgetName);
});

When('First User clicks Add widget button', async () => {
  await firstUser.addNewWidgetPage.clickAddWidgetButton();
  await firstUser.dashboardPage.waitForPreloaderDisappear();
});

When('Second User clicks on dashboard {string}', async (dashboardName: string) => {
  await secondUser.dashboardPage.clickOnDashboard(dashboardName);
});

Then('Opened dashboard is displayed with title {string}', async (titleName: string) => {
  const isTitleDisplayed = await testApplication.dashboardPage.isTitlePresent(titleName);
  expect(isTitleDisplayed).toBeTruthy();
});

Then('Widget {string} added by First User is displayed', async function (this: ICustomWorld, widgetName: string) {
  await secondUser.dashboardPage.waitForPreloaderDisappear();
  widgetName = widgetName === 'widgetName' ? this.scenarioContext.get(widgetName) : widgetName;
  const widgetHeaders = await secondUser.dashboardPage.getWidgetHeaders();
  expect(widgetHeaders).toContain(widgetName);
});
