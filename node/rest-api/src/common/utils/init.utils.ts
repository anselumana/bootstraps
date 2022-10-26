import { AppConfig } from "../config/app.config";


const initEnv = () => {
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
  initEnv();
  AppConfig.init();
}
