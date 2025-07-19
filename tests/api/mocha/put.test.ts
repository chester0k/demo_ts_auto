import WidgetsApi from '../../../framework/api/WidgetsApi';
import Env from '../../../framework/env/Env';
import DashboardApi from '../../../framework/api/DashboardApi';
import { it } from 'mocha';
import { expect } from 'chai';

it('Put widget on dashboard', async function () {
  this.widgetId = await WidgetsApi.postWidget(Env.PROJECT_NAME, this.widget);
  const dashboardID = await DashboardApi.getDashboardId(Env.PROJECT_NAME, 'DEMO DASHBOARD');

  this.dashboardWidget.addWidget.widgetId = this.widgetId;

  const responseBody = await WidgetsApi.putWidgetOnDashboard(Env.PROJECT_NAME, dashboardID, this.dashboardWidget);
  expect(responseBody.message).to.contain(
    `Widget with ID = '${this.widgetId}' was successfully added to the dashboard with ID = '${dashboardID}'`
  );

  const sharedWidgets = await WidgetsApi.getSharedWidgets(Env.PROJECT_NAME);
  const sharedWidgetsIds: number[] = sharedWidgets.content?.map((record) => record.id);
  expect(sharedWidgetsIds).to.contain(this.widgetId);
  expect(sharedWidgetsIds.filter((id) => id === this.widgetId).length).to.be.equal(1);
});

it('Widget with wrong id was not added on dashboard', async function () {
  const dashboardID = await DashboardApi.getDashboardId(Env.PROJECT_NAME, 'DEMO DASHBOARD');

  const responseBody = await WidgetsApi.putWidgetOnDashboard(Env.PROJECT_NAME, dashboardID, this.dashboardWidget);
  expect(responseBody.errorCode).to.be.equal(40420);
  expect(responseBody.message).to.contain(`Widget with ID '0' not found on project '${Env.PROJECT_NAME}'`);

  const sharedWidgets = await WidgetsApi.getSharedWidgets(Env.PROJECT_NAME);
  const sharedWidgetsIds: number[] = sharedWidgets.content?.map((sharedWidget) => sharedWidget.id);
  expect(sharedWidgetsIds.filter((id) => id === 0).length).to.be.equal(0);
});
