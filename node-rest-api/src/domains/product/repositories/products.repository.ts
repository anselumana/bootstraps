import { MongoDbRepository } from "../../../common/repository/mongodb.repository";
import { Product } from "../models/product.model";


export class ProductsRepository extends MongoDbRepository<Product> {
  constructor() {
    super("products");
  }
}