import * as fs from 'fs';
import * as path from "path";

export class AppConfig {
  private static currentConfig: Configuration;

  public static current() {
    return AppConfig.currentConfig;
  }

  public static init() {
    try {
      const config = AppConfig.getConfig();
      AppConfig.validateConfig(config);
      AppConfig.setConfig(config);
    } catch (err: any) {
      throw new Error(`Error initializing config: ${err.message}`);
    }
  }

  private static getConfig() {
      // get config file based on environment
      const env = process.env.NODE_ENV?.toLowerCase();
      const configFile = `${env}.config.json`;
      const json = fs.readFileSync(path.join(process.cwd(), "src", configFile), "utf8");
      const config = JSON.parse(json);
      return config;
  }

  private static validateConfig(config: any) {
    if (!config) {
      throw new Error("empty config file");
    }
    if (!config.connectionString) {
      throw new Error("empty config param 'connectionString'");
    }
    if (!config.port) {
      throw new Error("empty config param 'port'");
    }
    if (+config.port === NaN) {
      throw new Error("param 'port' must be a number");
    }
  }

  private static setConfig(config: any) {
    AppConfig.currentConfig = {
      port: config.port,
      connectionString: config.connectionString,
    }
  }
}

export interface Configuration {
  port: number,
  connectionString: string,
}