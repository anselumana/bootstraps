import * as fs from 'fs';
import * as path from "path";


interface Configuration {
  connectionString: string;
  port: number;
}

let config: Configuration;

const loadConfig = () => {
  const c = getConfig();
  validateConfig(c);
  setConfig(c);
}

const getConfig = () => {
  const env = process.env.NODE_ENV?.toLowerCase();
  const configFile = `${env}.config.json`;
  const json = fs.readFileSync(path.join(process.cwd(), "src", "config", configFile), "utf8");
  const config = JSON.parse(json);
  return config;
}

const validateConfig = (c: any) => {
  if (!c) {
    throw new Error("empty config file");
  }
  if (!c.connectionString) {
    throw new Error("empty config param 'connectionString'");
  }
  if (!c.port) {
    throw new Error("empty config param 'port'");
  }
  if (+c.port === NaN) {
    throw new Error("param 'port' must be a number");
  }
}

const setConfig = (c: any) => {
  config = {
    port: c.port,
    connectionString: c.connectionString,
  }
}


export default {
  load: () => {
    loadConfig();
  },
  config: () => config,
}