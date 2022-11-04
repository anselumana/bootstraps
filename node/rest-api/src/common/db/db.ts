import { MongoClient } from "mongodb";
import config from "../config/config";

let client: MongoClient;

export default {
  init: async () => {
    try {
      client = new MongoClient(config.config().connectionString);
      await client.connect()
    }
    catch (err: any) {
      throw new Error(`unable to connect to mongodb: ${err.message}`);
    }
  },
  client: () => client,
}