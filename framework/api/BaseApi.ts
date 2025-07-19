import * as Spec from 'pactum/src/models/Spec';
import { request, spec } from 'pactum';
import Env from '../env/Env';

export default class BaseApi {
  public static spec(): Spec {
    request.setBaseUrl(Env.API_URL);
    request.setBearerToken(Env.API_TOKEN);
    return spec().useLogLevel('DEBUG').retry(1, 500).withRequestTimeout(10000).expectResponseTime(9000);
  }

  public static async getApiToken() {
    const uiToken: string = await spec()
      .withHeaders('Authorization', 'Basic d=')
      .withHeaders('Content-Type', 'application/x-www-form-urlencoded')
      .withForm('grant_type', 'password')
      .withForm('username', `${Env.USER_LOGIN}`)
      .withForm('password', `${Env.USER_PASSWORD}`)
      .post(`${Env.BASE_URL}uat/sso/oauth/token`)
      .returns('access_token');

    return spec().withBearerToken(uiToken).get(`${Env.BASE_URL}uat/sso/me/apitoken`).returns('access_token');
  }
}
