import BaseApi from './BaseApi';

export default class DashboardApi extends BaseApi {
  static async getDashboardId(projectName: string, dashboardName: string) {
    return this.spec().get(`${projectName}/dashboard`).expectStatus(200).returns(`content[name=${dashboardName}].id`);
  }
}
