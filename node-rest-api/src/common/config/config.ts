import * as dotenv from 'dotenv';
import logger from '../logging/logger';
import z from "zod";
import { validate } from "../validation/validation";
import { exit } from '../utils/common.utils';


// load .env, if present
dotenv.config();

const env = process.env.NODE_ENV || "";

const supported_envs = ["dev", "stg", "prod"];
if (!(supported_envs.includes(env))) {
  exit(`'NODE_ENV' env variable has invaild value '${env}' while accepted values are [${supported_envs.map(e => `'${e}'`).join(", ")}].`);
}

logger.info(`environment: '${env}'`);

const environment = {
  MONGO_CONNECTION: process.env.MONGO_CONNECTION,
}

// use zod to define expected env variables
const expectedEnvironment = z.object({
  MONGO_CONNECTION: z.string(),
});

// validate env
const result = validate(environment, expectedEnvironment);
if (!result.success) {
  const error = result.errors![0];
  exit(`invalid environment variable '${error.field}' (reason: ${error.message})`);
}

interface Configuration {
  connectionString: string;
  port: number;
}

const config: Configuration = {
  connectionString: environment.MONGO_CONNECTION!,
  port: 4040,
};

export default config;