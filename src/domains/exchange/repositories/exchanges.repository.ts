import db from "../../../common/db/db";
import { MongoDbEntityRepository } from "../../../common/repository/mongodb.repository";
import { Exchange } from "../models/exchange.model";


export class ExchangesRepository extends MongoDbEntityRepository<Exchange> {
  constructor() {
    super(db.db(), "exchanges");
  }
}