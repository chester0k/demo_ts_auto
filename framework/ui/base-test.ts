import { test as baseTest } from '@playwright/test';
import logger from '../logger';
import Env from '../env/Env';
import { pagesFactory, PagesFixture } from './pages-types';

const test = baseTest.extend<PagesFixture>({
  testApplication: async ({ page }, use) => await use(pagesFactory(page))
});

baseTest.beforeEach(async ({ page }) => {
  await page.goto(Env.BASE_URL);

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      logger.error(`Console error: ` + msg.text());
    }
  });
});

export default test;
export const expect = baseTest.expect;
