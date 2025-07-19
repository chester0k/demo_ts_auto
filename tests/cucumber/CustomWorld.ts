import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';

export interface ICustomWorld extends World {
  scenarioContext?: Map<string, any>;
}

export class CustomWorld extends World implements ICustomWorld {
  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
