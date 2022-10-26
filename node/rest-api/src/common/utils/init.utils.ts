import { AppConfig } from "../config/app.config";


export default async function init() {
  initEnv();
  AppConfig.init();
}


const initEnv = () => {
  const supported_envs = ["dev", "stg", "prod"];
  if (!process.env.env) {
      console.warn("no environment variable 'env' has been defined, running in default 'dev' mode");
      process.env.env = "dev";
  } else if (!(supported_envs.includes(process.env.env))) {
      console.warn(`invalid environment variable 'env': value is '${process.env.env}' while accepted values are [${supported_envs.map(e => `'${e}'`).join(", ")}]. Running in default 'dev' mode`);
      process.env.env = "dev";
  }
  console.log(`app env: '${process.env.env}'`);
}

