import { launchesFilters } from '../../framework/test-data/launches-filters';
import test, { expect } from '../../framework/ui/base-test';
import Env from '../../framework/env/Env';

launchesFilters.forEach((record) =>
  test(`Data Driven test for Launches filter @4 ${record.name}`, async ({ testApplication }) => {
    await test.step('Login', async () => {
      await testApplication.mainPage.login(Env.USER_LOGIN, Env.USER_PASSWORD);
      expect(await testApplication.dashboardPage.isAddDashboardButtonPresent()).toBeTruthy();
    });

    await test.step('Select Project', async () => {
      await testApplication.dashboardPage.clickProjectsSelectorButton();
      await testApplication.dashboardPage.selectInProjectSelector(Env.PROJECT_NAME);
    });

    await test.step(`Verify Launches contain ${record.name} filter`, async () => {
      await testApplication.dashboardPage.clickOnMenu('Launches');
      const titles = await testApplication.launchesPage.getCellTitles();
      expect(titles).toContain(record.value);
    });
  })
);
