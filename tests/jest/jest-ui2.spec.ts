import { test, expect } from '@playwright/test';
import Env from '../../framework/env/Env';
import { pagesFactory } from '../../framework/ui/pages-types';

let testApplication;

test.beforeAll(async ({ page }) => {
  testApplication = pagesFactory(page);
  await page.goto(Env.BASE_URL);
});

test('Valid login', async () => {
  await testApplication.mainPage.login(Env.USER_LOGIN, Env.USER_PASSWORD);
  expect(await testApplication.dashboardPage.isAddDashboardButtonPresent()).toBeTruthy();

  await testApplication.dashboardPage.clickProjectsSelectorButton();
  await testApplication.dashboardPage.selectInProjectSelector(Env.PROJECT_NAME);
  await testApplication.dashboardPage.clickOnDashboard('DEMO DASHBOARD');

  const isTitleDisplayed = await testApplication.dashboardPage.isTitlePresent('DEMO DASHBOARD');
  expect(isTitleDisplayed).toBeTruthy();
});
