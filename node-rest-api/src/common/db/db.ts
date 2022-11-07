import { MongoClient, Db } from "mongodb";
import config from "../config/config";
import logger from "../logging/logger";


const connectWithRetry = async (client: MongoClient) => {
  const tries = 3;
  let currentTry = 0;
  while (currentTry < tries) {
    logger.info(`attempting to connect to mongodb (try ${currentTry + 1}/${tries})`);
    try {
      await client.connect();
      logger.info("connection successful");
      break;
    }
    catch (err: any) {
      const message = `unable to connect to mongodb: ${err.message}`;
      if (currentTry === 2) {
        throw new Error(message);
      }
      logger.warn(message);
      currentTry++;
    }
  }
}

const getDbClient = () => {
  try {
    return new MongoClient(config.connectionString);
  }
  catch (err: any) {
    throw new Error(`unable to instanciate mongo client: ${err.message}`);
  }
}

const getDb = async () => {
  const client = getDbClient();
  await connectWithRetry(client);
  return client.db();
}

let db: Db;


export default {
  connect: async () => {
    db = await getDb();
  },
  instance: () => {
    return db;
  }
};