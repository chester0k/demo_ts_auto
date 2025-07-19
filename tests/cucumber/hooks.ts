import { After, AfterStep, Before, BeforeAll, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { Browser, chromium, Page } from '@playwright/test';
import { pagesFactory } from '../../framework/ui/pages-types';
import globalSetup from '../../framework/global-setup';
import WidgetsApi from '../../framework/api/WidgetsApi';
import { ICustomWorld } from './CustomWorld';
import Env from '../../framework/env/Env';

let browser: Browser;
let page: Page;
let firstPage: Page;
let secondPage: Page;
export let testApplication = undefined as ReturnType<typeof pagesFactory>;
export let firstUser = undefined as ReturnType<typeof pagesFactory>;
export let secondUser = undefined as ReturnType<typeof pagesFactory>;

setDefaultTimeout(30000);

BeforeAll(async function () {
  await globalSetup();
  Env.init();
});

Before({ tags: '@two_users' }, async function (this: ICustomWorld) {
  await globalSetup();
  this.scenarioContext = new Map<string, string>();
  browser = await chromium.launch({ headless: false });
  firstPage = await browser.newPage();
  secondPage = await browser.newPage();
  firstUser = pagesFactory(firstPage);
  secondUser = pagesFactory(secondPage);
  const errorListener = (msg) => {
    if (msg.type() === 'error') {
      this.log(`Console error: ` + msg.text());
    }
  };

  firstUser.mainPage.getPage().on('console', errorListener);
  secondUser.mainPage.getPage().on('console', errorListener);
});

Before({ tags: 'not @two_users' }, async function (this: ICustomWorld) {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  testApplication = pagesFactory(page);
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      this.log(`Console error: ` + msg.text());
    }
  });
});

After({ tags: 'not @two_users' }, async () => {
  await page.close();
  await browser.close();
});

After({ tags: '@two_users' }, async function (this: ICustomWorld) {
  if (this.scenarioContext.has('widgetName')) {
    await WidgetsApi.deleteWidgetFromDashboard('DEMO DASHBOARD', this.scenarioContext.get('widgetName'));
  }
});

After({ tags: '@two_users' }, async function (this: ICustomWorld) {
  await firstPage.close();
  await secondPage.close();
  await browser.close();
});

AfterStep({ tags: 'not @two_users' }, async function ({ result }) {
  if (result.status !== Status.PASSED) {
    const image = await page.screenshot();
    this.attach(image, 'image/png');
  }
});

AfterStep({ tags: '@two_users' }, async function ({ result }) {
  if (result.status !== Status.PASSED) {
    const imageUser1 = await firstPage?.screenshot();
    const imageUser2 = await secondPage?.screenshot();
    this.attach(imageUser1, 'image/png');
    this.attach(imageUser2, 'image/png');
  }
});
