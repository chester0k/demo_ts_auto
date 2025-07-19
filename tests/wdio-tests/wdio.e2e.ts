import DashboardApi from '../../framework/api/DashboardApi';
import FiltersApi from '../../framework/api/FiltersApi';
import WidgetsApi from '../../framework/api/WidgetsApi';
import Env from '../../framework/env/Env';
import globalSetup from '../../framework/global-setup';
import DashboardPage from '../../framework/wdio/pageobjects/DashboardPage';
import MainPage from '../../framework/wdio/pageobjects/MainPage';
import WidgetsPage from '../../framework/wdio/pageobjects/WidgetsPage';
import { dashboardWidgetData, widgetData } from '../test-data/api/widgets-data';

let widgetId;

describe('My Login application', () => {
  before('Setup', async () => {
    await globalSetup();
  });

  before('Create widget via API', async () => {
    widgetData.filterIds = [await FiltersApi.getUserFilterId('DEMO_FILTER')];
    widgetId = await WidgetsApi.postWidget(Env.PROJECT_NAME, widgetData);
    const dashboardID = await DashboardApi.getDashboardId(Env.PROJECT_NAME, 'DEMO DASHBOARD');

    dashboardWidgetData.addWidget.widgetId = widgetId;

    const responseBody = await WidgetsApi.putWidgetOnDashboard(Env.PROJECT_NAME, dashboardID, dashboardWidgetData);
    expect(responseBody.message).toContain(
      `Widget with ID = '${widgetId}' was successfully added to the dashboard with ID = '${dashboardID}'`
    );
  });

  it('Resize widget', async () => {
    await MainPage.open(Env.BASE_URL);
    await MainPage.login(Env.USER_LOGIN, Env.USER_PASSWORD);
    await MainPage.closeLoginNotification();

    await DashboardPage.clickProjectsSelectorButton();
    await DashboardPage.selectInProjectSelector(Env.PROJECT_NAME);
    await DashboardPage.clickOnDashboard(`DEMO DASHBOARD`);

    await WidgetsPage.waitForPreloaderDisappear();
    await WidgetsPage.scrollToButtom();
    await WidgetsPage.waitForPreloaderDisappear();
    await WidgetsPage.scrollToWidget(widgetData.name);

    const widgetSizeBefore = await WidgetsPage.getWidgetSize(widgetData.name);
    await WidgetsPage.resizeWidget(widgetData.name, -550, -550);
    const widgetSizeAfter = await WidgetsPage.getWidgetSize(widgetData.name);

    await expect(widgetSizeAfter.height).toBeLessThan(widgetSizeBefore.height);
    await expect(widgetSizeAfter.width).toBeLessThan(widgetSizeBefore.width);
  });

  after('Delete widget', async () => {
    await WidgetsApi.deleteWidgetByIdFromDashboard('DEMO DASHBOARD', widgetId);
  });
});
