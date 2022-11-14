import db from "../../../common/db/db";
import { MongoDbEntityRepository } from "../../../common/repository/mongodb.repository";
import { Symbol } from "../models/symbol.model";


export class SymbolsRepository extends MongoDbEntityRepository<Symbol> {
  constructor() {
    super(db.db(), "symbols");
  }
}