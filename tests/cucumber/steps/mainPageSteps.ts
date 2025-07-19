import { Given, When } from '@cucumber/cucumber';
import { testApplication, firstUser, secondUser } from '../hooks';
import Env from '../../../framework/env/Env';

Given('User navigates to Login page', async () => {
  await testApplication.mainPage.getPage().goto(Env.BASE_URL);
});

Given('First user navigates to Login page', async () => {
  await firstUser.mainPage.getPage().goto(Env.BASE_URL);
});

Given('Second user navigates to Login page', async () => {
  await secondUser.mainPage.getPage().goto(Env.BASE_URL);
});

When('User logs in with {string} login and password {string}', async (name, password) => {
  await testApplication.mainPage.login(name, password);
});

When('User logs in with valid credentials', async () => {
  await testApplication.mainPage.login(Env.USER_LOGIN, Env.USER_PASSWORD);
});

When('First user logs in with valid credentials', async () => {
  await firstUser.mainPage.login(Env.USER_LOGIN, Env.USER_PASSWORD);
});

When('Second user logs in with valid credentials', async () => {
  await secondUser.mainPage.login(Env.SECOND_LOGIN, Env.SECOND_PASSWORD);
});
