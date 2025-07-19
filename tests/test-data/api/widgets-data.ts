const widgetData = {
  contentParameters: {
    contentFields: ['Test 1', 'Test 2', 'Test 3'],
    itemsCount: 40,
    widgetOptions: {}
  },
  description: 'Test Description',
  filterIds: [0],
  name: `Demo Api Widget ${Math.random() * 100}`,
  share: true,
  widgetType: 'launchesDurationChart'
};

const dashboardWidgetData = {
  addWidget: {
    share: true,
    widgetId: 0,
    widgetName: `Test name ${Math.random() * 100}`,
    widgetOptions: {},
    widgetPosition: {
      positionX: 100,
      positionY: 100
    },
    widgetSize: {
      height: 10,
      width: 10
    },
    widgetType: 'launchesDurationChart'
  }
};

export { widgetData, dashboardWidgetData };
