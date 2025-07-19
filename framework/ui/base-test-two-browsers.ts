import { test as baseTest } from '@playwright/test';
import logger from '../logger';
import Env from '../env/Env';
import { pagesFactory, PagesFixtureTwoClients } from './pages-types';

const test = baseTest.extend<PagesFixtureTwoClients>({
  userFirst: async ({ browser }, use) => {
    const firstPage = await browser.newPage();
    await use(pagesFactory(firstPage));
  },
  userSecond: async ({ browser }, use) => {
    const secondPage = await browser.newPage();
    await use(pagesFactory(secondPage));
  }
});

test.beforeEach(async ({ userFirst, userSecond }) => {
  await userFirst.mainPage.getPage().goto(Env.BASE_URL);
  await userSecond.mainPage.getPage().goto(Env.BASE_URL);

  const errorListener = (msg) => {
    if (msg.type() === 'error') {
      logger.error(`Console error: ` + msg.text());
    }
  };

  userFirst.mainPage.getPage().on('console', errorListener);
  userSecond.mainPage.getPage().on('console', errorListener);
});

export default test;
export const expect = test.expect;
