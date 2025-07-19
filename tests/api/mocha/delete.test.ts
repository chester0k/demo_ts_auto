import WidgetsApi from '../../../framework/api/WidgetsApi';
import Env from '../../../framework/env/Env';
import { it } from 'mocha';
import DashboardApi from '../../../framework/api/DashboardApi';
import { expect } from 'chai';

it('Delete widget from dashboard', async function () {
  this.widgetId = await WidgetsApi.postWidget(Env.PROJECT_NAME, this.widget);
  const dashboardID = await DashboardApi.getDashboardId(Env.PROJECT_NAME, 'DEMO DASHBOARD');

  this.dashboardWidget.addWidget.widgetId = this.widgetId;

  await WidgetsApi.putWidgetOnDashboard(Env.PROJECT_NAME, dashboardID, this.dashboardWidget);
  const response = await WidgetsApi.deleteWidgetByIdFromDashboard('DEMO DASHBOARD', this.widgetId);

  expect(response.message).to.contain(`Widget with ID = '${this.widgetId}' was successfully deleted from the system`);
  const widgets = await WidgetsApi.getUserWidgetsNames(Env.PROJECT_NAME);
  expect(await widgets.content).not.to.include(this.widget.name);
});

it('Error response when delete not existing widget', async function () {
  const wrongId = 0;
  const response = await WidgetsApi.deleteWidgetByIdFromDashboard('DEMO DASHBOARD', wrongId);

  expect(response.errorCode).to.be.equal(40420);
  expect(response.message).to.contain(
    `Widget with ID '${wrongId}' not found on project '${Env.PROJECT_NAME}'. Did you use correct Widget ID?`
  );
});
