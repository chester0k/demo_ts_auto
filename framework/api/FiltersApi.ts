import BaseApi from './BaseApi';
import Env from '../env/Env';

export default class FiltersApi extends BaseApi {
  static async getUserFilterId(filterName: string) {
    return this.spec().get(`${Env.PROJECT_NAME}/filter`).expectStatus(200).returns(`content[name=${filterName}].id`);
  }
}
