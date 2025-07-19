import BaseApi from '../api/BaseApi';

export default class Env {
  public static BASE_URL: string = process.env.BASE_URL;
  public static USER_LOGIN: string = process.env.USER_LOGIN;
  public static USER_PASSWORD: string = process.env.USER_PASSWORD;
  public static SECOND_LOGIN: string = process.env.SECOND_LOGIN;
  public static SECOND_PASSWORD: string = process.env.SECOND_PASSWORD;
  public static API_URL: string = process.env.API_URL;
  public static API_TOKEN: string = process.env.API_TOKEN;
  public static PROJECT_NAME: string = process.env.PROJECT_NAME;

  public static async init() {
    Env.BASE_URL = process.env.BASE_URL;
    Env.USER_LOGIN = process.env.USER_LOGIN;
    Env.USER_PASSWORD = process.env.USER_PASSWORD;
    Env.SECOND_LOGIN = process.env.SECOND_LOGIN;
    Env.SECOND_PASSWORD = process.env.SECOND_PASSWORD;
    Env.API_URL = process.env.API_URL;
    Env.API_TOKEN = await BaseApi.getApiToken();
    Env.PROJECT_NAME = process.env.PROJECT_NAME;
  }
}
