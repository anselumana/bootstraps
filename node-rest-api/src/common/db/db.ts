import { MongoClient } from "mongodb";
import config from "../config/config";
import logger from "../logging/logger";


const _logger = logger.child({});

let client: MongoClient;

const connectWithRetry = async () => {
  const tries = 3;
  let currentTry = 0;
  while (currentTry < tries) {
    _logger.info(`attempting to connect to mongodb (try ${currentTry + 1}/${tries})`);
    try {
      await client.connect();
      _logger.info("connection successful");
      break;
    }
    catch (err: any) {
      const message = `unable to connect to mongodb: ${err.message}`;
      if (currentTry === 2) {
        throw new Error(message);
      }
      _logger.warn(message);
      currentTry++;
    }
  }
}

export default {
  init: async () => {
    try {
      client = new MongoClient(config.config().connectionString);
    }
    catch (err: any) {
      throw new Error(`unable to instanciate mongo client: ${err.message}`);
    }
    await connectWithRetry();
  },
  db: () => {
    if (!client) {
      throw new Error("attempted to access db client before initialization");
    }
    return client.db();
  }
}