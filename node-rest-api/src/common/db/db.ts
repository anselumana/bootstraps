import { MongoClient, Db } from "mongodb";
import config from "../config/config";
import logger from "../logging/logger";


/**
 * mongodb.MongoClient wrapper.
 */
class MongoDbClient {
  private client: MongoClient;

  constructor(connectionString: string) {
    try {
      this.client = new MongoClient(connectionString);
    }
    catch (err: any) {
      throw new Error(`unable to instanciate mongo client: ${err.message}`);
    }
  }

  public db(): Db {
    return this.client.db();
  }

  /**
   * Attempts to connect to a Mongo DB instance.
   * @param maxRetry max number of tries to connect to Mongo DB before throwing error.
   */
  public async connect(maxRetry: number = 3): Promise<void> {
    let currentTry = 0;
    while (currentTry < maxRetry) {
      logger.info(`attempting to connect to mongodb (try ${currentTry + 1}/${maxRetry})`);
      try {
        await this.client.connect();
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
}


export default new MongoDbClient(config.connectionString);
