import Env from '../../../framework/env/Env';
import { expect } from 'chai';
import WidgetsApi from '../../../framework/api/WidgetsApi';
import { it } from 'mocha';
import DashboardApi from '../../../framework/api/DashboardApi';

it('Search shared widget by name', async function () {
  this.widgetId = await WidgetsApi.postWidget(Env.PROJECT_NAME, this.widget);
  const dashboardID = await DashboardApi.getDashboardId(Env.PROJECT_NAME, 'DEMO DASHBOARD');

  this.dashboardWidget.addWidget.widgetId = this.widgetId;

  await WidgetsApi.putWidgetOnDashboard(Env.PROJECT_NAME, dashboardID, this.dashboardWidget);

  const widgets = await WidgetsApi.getSharedWidgetsByName(Env.PROJECT_NAME, this.widget.name);
  expect(widgets.length).to.be.equal(1);
  expect(widgets[0].widgetId).to.be.equal(this.widgetId);
});

it('Wrong widget is not found', async function () {
  const response = await WidgetsApi.getSharedWidgetsByName(Env.PROJECT_NAME, 'wrong widget name');
  expect(response.content.length).is.equal(0);
});
