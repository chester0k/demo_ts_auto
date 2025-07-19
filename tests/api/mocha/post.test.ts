import WidgetsApi from '../../../framework/api/WidgetsApi';
import Env from '../../../framework/env/Env';
import { expect } from 'chai';
import { it } from 'mocha';

it('Create new Widget', async function () {
  this.widgetId = await WidgetsApi.postWidget(Env.PROJECT_NAME, this.widget);

  const widgets = await WidgetsApi.getUserWidgetsNames(Env.PROJECT_NAME);
  expect(widgets.content).to.include(this.widget.name);
});

it('Widget with wrong filter id is not added', async function () {
  this.widget.filterIds = [0];
  this.widgetId = await WidgetsApi.postWidget(Env.PROJECT_NAME, this.widget);

  const widgets = await WidgetsApi.getUserWidgetsNames(Env.PROJECT_NAME);
  expect(widgets.content).not.to.include(this.widget.name);
  expect(this.widgetId).to.be.undefined;
});
