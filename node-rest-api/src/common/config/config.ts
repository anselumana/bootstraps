import * as dotenv from 'dotenv';
import logger from '../logging/logger';
import { exit } from '../utils/common.utils';
import { validateEnvironment } from './config.helper';


// load .env, if present
dotenv.config();

const env = process.env.NODE_ENV || "";

const supported_envs = ["dev", "stg", "prod"];
if (!(supported_envs.includes(env))) {
  exit(`'NODE_ENV' env variable has invaild value '${env}' while accepted values are [${supported_envs.map(e => `'${e}'`).join(", ")}].`);
}

logger.info(`environment: '${env}'`);

const environment = {
  PORT: process.env.PORT,
  MONGO_CONNECTION: process.env.MONGO_CONNECTION,
}

// validate env
const error = validateEnvironment(environment);
if (error) {
  exit(error);
}

interface Configuration {
  connectionString: string;
  port: number;
}

const config: Configuration = {
  connectionString: environment.MONGO_CONNECTION!,
  port: +environment.PORT!,
};

export default config;