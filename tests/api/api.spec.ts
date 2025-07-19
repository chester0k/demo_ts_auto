import BaseApi from '../../framework/api/BaseApi';
import Env from '../../framework/env/Env';
import { it } from 'mocha';
import WidgetsApi from '../../framework/api/WidgetsApi';

it('should get a response with status code 200', async () => {
  await BaseApi.spec()
    .get(`${Env.PROJECT_NAME}/dashboard`)
    .expectStatus(200)
    .expectJsonLike({
      content: [
        {
          name: 'DEMO DASHBOARD'
        }
      ]
    });
});

it('should get a response with status code 200', async () => {
  await BaseApi.spec()
    .get(`${Env.PROJECT_NAME}/dashboard`)
    .expectStatus(200)
    .expectJsonLike({
      content: [
        {
          name: 'DEMO DASHBOARD'
        }
      ]
    });
});

it('Delete all demo widgtes', async function () {
  const sw = await WidgetsApi.getSharedWidgets(Env.PROJECT_NAME);
  const widgetIds: number[] = sw.content.filter((f) => f.name.includes('Demo Api Widget')).map((a) => a.id);
  for (const w of widgetIds) {
    await WidgetsApi.deleteWidgetByIdFromDashboard('DEMO DASHBOARD', w);
  }
});
