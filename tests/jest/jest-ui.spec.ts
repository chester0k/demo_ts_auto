import { test, expect } from '@playwright/test';
import Env from '../../framework/env/Env';
import { pagesFactory } from '../../framework/ui/pages-types';

let testApplication;

test.beforeAll(async ({ page }) => {
  testApplication = pagesFactory(page);
  await page.goto(Env.BASE_URL);
});

test('Invalid Password', async () => {
  await testApplication.mainPage.login(Env.USER_LOGIN, 'wrongPass');
  const isDisplayed = await testApplication.dashboardPage.isAddDashboardButtonPresent();
  expect(isDisplayed).toBeFalsy();
});
