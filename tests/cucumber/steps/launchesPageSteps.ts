import { DataTable, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { testApplication } from '../hooks';
import { launchesFilters } from '../../../framework/test-data/launches-filters';

Then('Verify Launches contain {string} filter', async (filterName: string) => {
  await testApplication.dashboardPage.clickOnMenu('Launches');
  const titles = await testApplication.launchesPage.getCellTitles();
  const record = launchesFilters.find((record) => record.name === filterName);
  expect(titles).toContain(record.value);
});

Then('Verify Launches contain filters', async (table: DataTable) => {
  await testApplication.dashboardPage.clickOnMenu('Launches');
  const titles = await testApplication.launchesPage.getCellTitles();
  table
    .raw()
    .at(0)
    .forEach((value) => {
      const record = launchesFilters.find((record) => record.name === value);
      expect(titles.includes(record.value));
    });
});
