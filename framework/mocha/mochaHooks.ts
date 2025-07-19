import globalSetup from '../global-setup';
import Env from '../env/Env';
import WidgetsApi from '../api/WidgetsApi';
import { cloneJSON } from '../helpers';
import { dashboardWidgetData, widgetData } from '../../tests/test-data/api/widgets-data';
import BaseApi from '../api/BaseApi';
import FiltersApi from '../api/FiltersApi';

export const mochaHooks = async () => {
  return {
    async beforeAll() {
      await globalSetup();
      Env.init();
      Env.API_TOKEN = await BaseApi.getApiToken();
      widgetData.filterIds = [await FiltersApi.getUserFilterId('DEMO_FILTER')];
    },

    async beforeEach() {
      this.widget = cloneJSON(widgetData);
      this.dashboardWidget = cloneJSON(dashboardWidgetData);
    },

    async afterEach() {
      if (this.widgetId) {
        await WidgetsApi.deleteWidgetByIdFromDashboard('DEMO DASHBOARD', this.widgetId);
      }
    }
  };
};
