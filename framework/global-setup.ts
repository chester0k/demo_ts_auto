import Env from './env/Env';

import dotenv from 'dotenv';

export default async function globalSetup() {
  const env_var: string = process.env['env_var'] ?? 'remote';

  if (env_var) {
    dotenv.config({
      path: `./framework/env/.env.${env_var}`,
      override: true
    });
  }
  await Env.init();
}
