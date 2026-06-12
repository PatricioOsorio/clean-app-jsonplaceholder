import { from } from 'env-var';

const env = from({
  VITE_ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT,
  VITE_URL_DOMAIN: import.meta.env.VITE_URL_DOMAIN,
  VITE_BASEPATH: import.meta.env.VITE_BASEPATH,
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
});

const VITE_ENVIRONMENT = env
  .get('VITE_ENVIRONMENT')
  .default('local')
  .asEnum(['local', 'staging', 'production']);

const VITE_URL_DOMAIN = env.get('VITE_URL_DOMAIN').default('http://localhost').asString();

const VITE_BASEPATH = env.get('VITE_BASEPATH').default('/').asString();

const VITE_API_BASE_URL = env
  .get('VITE_API_BASE_URL')
  .default('https://jsonplaceholder.typicode.com')
  .asString();

export const ENV = {
  VITE_ENVIRONMENT,
  VITE_URL_DOMAIN,
  VITE_BASEPATH,
  VITE_API_BASE_URL,
  IS_LOCAL: VITE_ENVIRONMENT === 'local',
  IS_PROD: VITE_ENVIRONMENT === 'production',
} as const;
