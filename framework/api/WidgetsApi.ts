import BaseApi from './BaseApi';
import Env from '../env/Env';
import DashboardApi from './DashboardApi';

export default class WidgetsApi extends BaseApi {
  static async deleteWidgetFromDashboard(dashboardName: string, widgetName: string) {
    const widgetId = await this.getSharedWidgetId(Env.PROJECT_NAME, widgetName);

    return await this.deleteWidgetByIdFromDashboard(dashboardName, widgetId);
  }

  static async deleteWidgetByIdFromDashboard(dashboardName: string, widgetId) {
    const dashboardID = await DashboardApi.getDashboardId(Env.PROJECT_NAME, dashboardName);

    return this.spec().delete(`${Env.PROJECT_NAME}/dashboard/${dashboardID}/${widgetId}`).returns('res.body');
  }

  static async getUserWidgetsNames(projectName: string) {
    return this.spec().get(`${projectName}/widget/names/all`).returns('res.body');
  }

  static async postWidget(projectName: string, widgetBody) {
    return this.spec().withBody(widgetBody).post(`${projectName}/widget/`).returns('id');
  }

  static async putWidgetOnDashboard(projectName: string, dashboardId, widgetBody) {
    return this.spec().withBody(widgetBody).put(`${projectName}/dashboard/${dashboardId}/add`).returns('res.body');
  }

  static async getSharedWidgetId(projectName: string, widgetName) {
    const sharedWidgets = await this.getSharedWidgets(projectName);
    return sharedWidgets.filter((widget) => widget.widgetName === widgetName).map((widget) => widget.widgetId)[0];
  }

  static async getSharedWidgets(projectName: string) {
    return this.spec().get(`${projectName}/dashboard`).expectStatus(200).returns(`content.widgets`);
  }

  static async getSharedWidgetsByName(projectName: string, widgetName: string) {
    const sharedWidgets = await this.getSharedWidgets(projectName);
    return sharedWidgets.filter((widget) => widget.widgetName === widgetName);
  }
}
