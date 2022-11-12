import db from "../../../common/db/db";
import { MongoDbEntityRepository } from "../../../common/repository/mongodb.repository";
import { Product } from "../models/product.model";


export class ProductsRepository extends MongoDbEntityRepository<Product> {
  constructor() {
    super(db.db(), "products");
  }
}