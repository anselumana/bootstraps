import { ObjectId } from "mongodb";
import db from "../../../common/db/db";
import { IRepository } from "../../../common/interfaces/repository.interface";
import { Product } from "../models/product.model";


export class ProductsRepository implements IRepository<Product> {
  // products collection
  private collection = db.db().collection<Product>("product");

  public async list() {
    return await this.collection.find().toArray();
  };
  public async get(id: string) {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  };
  public async create(entity: Product) {
    const { insertedId } = await this.collection.insertOne(entity);
    return insertedId.toString();
  };
  update!: (id: string, entity: Product) => Promise<Product>;
  delete!: (id: string) => Promise<boolean>;
}