import { Page } from '@playwright/test';
import { MainPage } from './pagesObjects/MainPage';
import { DashboardPage } from './pagesObjects/DashboardPage';
import { AddNewWidgetPage } from './pagesObjects/AddNewWidgetPage';
import { LaunchesPage } from './pagesObjects/LaunchesPage';

export const pagesFactory = (page: Page) => ({
  mainPage: new MainPage(page),
  dashboardPage: new DashboardPage(page),
  addNewWidgetPage: new AddNewWidgetPage(page),
  launchesPage: new LaunchesPage(page)
});

export type PagesFixture = {
  testApplication: ReturnType<typeof pagesFactory>;
};

export type PagesFixtureTwoClients = {
  userFirst: ReturnType<typeof pagesFactory>;
  userSecond: ReturnType<typeof pagesFactory>;
};
