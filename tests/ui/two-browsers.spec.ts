import test, { expect } from '../../framework/ui/base-test-two-browsers';
import Env from '../../framework/env/Env';
import WidgetsApi from '../../framework/api/WidgetsApi';

const widgetName: string = 'Demo Widget ' + Math.random() * 100;
test('Add widget by 1 user verify by another @3', async ({ userFirst, userSecond }) => {
  await test.step('Login User 1', async () => {
    await userFirst.mainPage.login(Env.USER_LOGIN, Env.USER_PASSWORD);
    expect(await userFirst.dashboardPage.isAddDashboardButtonPresent()).toBeTruthy();
  });

  await test.step('Login User 2', async () => {
    await userSecond.mainPage.login(Env.SECOND_LOGIN, Env.SECOND_PASSWORD);
    expect(await userSecond.dashboardPage.isAddDashboardButtonPresent()).toBeTruthy();
  });

  await test.step('Click Dashboard User1', async () => {
    await userFirst.dashboardPage.clickProjectsSelectorButton();
    await userFirst.dashboardPage.selectInProjectSelector(Env.PROJECT_NAME);
    await userFirst.dashboardPage.clickOnDashboard('DEMO DASHBOARD');
  });

  await test.step('Add new Widget by User1', async () => {
    await userFirst.dashboardPage.clickOnAddNewWidget();
    await userFirst.addNewWidgetPage.selectWidgetType('Launch statistics chart');
    await userFirst.addNewWidgetPage.clickNextStepButton();
    await userFirst.addNewWidgetPage.selectConfigureWidgetFilter('DEMO_FILTER');
    await userFirst.addNewWidgetPage.clickNextStepButton();
    await userFirst.addNewWidgetPage.enterWidgetName(widgetName);
    await userFirst.addNewWidgetPage.clickAddWidgetButton();
  });

  await test.step('Click Dashboard User2', async () => {
    await userSecond.dashboardPage.clickProjectsSelectorButton();
    await userSecond.dashboardPage.selectInProjectSelector(Env.PROJECT_NAME);
    await userSecond.dashboardPage.clickOnDashboard('DEMO DASHBOARD');
  });

  await test.step('Widget added by User 1 is displayed', async () => {
    const widgetHeaders = await userSecond.dashboardPage.getWidgetHeaders();
    expect(widgetHeaders).toContain(widgetName);
  });
});

test.afterAll(async () => {
  await WidgetsApi.deleteWidgetFromDashboard('DEMO DASHBOARD', widgetName);
});
