import test, { expect } from '../../framework/ui/base-test';
import Env from '../../framework/env/Env';

test.describe('groups', () => {
  test('Invalid Password @1', async ({ testApplication }) => {
    await test.step('Login', async () => {
      await testApplication.mainPage.login(Env.USER_LOGIN, 'wrongPass');
      const isDisplayed = await testApplication.dashboardPage.isAddDashboardButtonPresent();
      expect(isDisplayed).toBeFalsy();
    });
  });

  test('Valid login @2', async ({ testApplication }) => {
    await test.step('Login', async () => {
      await testApplication.mainPage.login(Env.USER_LOGIN, Env.USER_PASSWORD);
      expect(await testApplication.dashboardPage.isAddDashboardButtonPresent()).toBeTruthy();
    });

    await test.step('Click Dashboard', async () => {
      await testApplication.dashboardPage.clickProjectsSelectorButton();
      await testApplication.dashboardPage.selectInProjectSelector(Env.PROJECT_NAME);
      await testApplication.dashboardPage.clickOnDashboard('DEMO DASHBOARD');
    });

    await test.step('Title is displayed', async () => {
      const isTitleDisplayed = await testApplication.dashboardPage.isTitlePresent('DEMO DASHBOARD');
      expect(isTitleDisplayed).toBeTruthy();
    });
  });
});
