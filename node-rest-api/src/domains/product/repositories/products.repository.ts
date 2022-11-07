import { ObjectId } from "mongodb";
import db from "../../../common/db/db";
import { IRepository } from "../../../common/interfaces/repository.interface";
import { Product } from "../models/product.model";


export class ProductsRepository implements IRepository<Product> {
  private collectionName = "products";

  public async list() {
    return await this.collection().find().toArray();
  };

  public async get(id: string) {
    return await this.collection().findOne(this.getIdFilter(id));
  };

  public async create(entity: Product) {
    const { insertedId } = await this.collection().insertOne(entity);
    return insertedId.toString();
  };

  public async update(id: string, entity: Product) {
    const res = await this.collection().findOneAndUpdate(
      this.getIdFilter(id),
      { $set: entity },
      { returnDocument: "after" });
    return res.ok === 1 ? res.value : null;
  };
  
  public async delete(id: string) {
    const res = await this.collection().deleteOne(this.getIdFilter(id));
    return res.deletedCount === 1;
  };
  
  private collection() {
    return db.instance().collection<Product>(this.collectionName);
  }

  private getIdFilter(id: string) {
    return { _id: new ObjectId(id) };
  }
}