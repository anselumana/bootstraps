import config from "./common/config/config";
import * as dotenv from 'dotenv';


const loadEnvironment = () => {
  // load .env
  dotenv.config();
  const supported_envs = ["dev", "stg", "prod"];
  const env = process.env.NODE_ENV;
  if (!env) {
    throw new Error(`'NODE_ENV' env variable has not been defined.`);
  } else if (!(supported_envs.includes(env))) {
    throw new Error(`'NODE_ENV' env variable has invaild value '${env}' while accepted values are [${supported_envs.map(e => `'${e}'`).join(", ")}].`);
  }
  console.info(`environment: '${env}'`);
}

export default async function init() {
  loadEnvironment();
  config.load();
}