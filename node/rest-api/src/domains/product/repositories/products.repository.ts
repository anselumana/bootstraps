import db from "../../../common/db/db";
import { IRepository } from "../../../common/interfaces/repository.interface";
import { Product } from "../models/product.model";


export class ProductsRepository implements IRepository<Product> {
  // products collection
  private collection = db.db().collection<Product>("product");

  public async list() {
    return await this.collection.find().toArray();
  };
  get!: (id: string) => Promise<Product | undefined>;
  create!: (entity: Product) => Promise<string>;
  update!: (id: string, entity: Product) => Promise<Product>;
  delete!: (id: string) => Promise<boolean>;
}