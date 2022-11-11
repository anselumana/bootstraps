import { ObjectId, OptionalId, Document } from "mongodb";
import db from "../db/db";
import { IReadRepository, IRepository } from "../interfaces/repository.interface";


export class MongoDbRepository<T> implements IRepository<T> {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  public async list(): Promise<T[]> {
    const entities = await this.collection().find().toArray();
    return this.mapIds(entities) as T[];
  }

  public async get(id: string): Promise<T> {
    const entity = await this.collection().findOne(this.idFilter(id));
    return this.mapId(entity) as T;
  }

  public async create(entity: T): Promise<string> {
    const { insertedId } = await this.collection().insertOne(entity as OptionalId<Document>);
    return insertedId.toString();
  };

  public async update(id: string, entity: T): Promise<T> {
    const res = await this.collection().findOneAndUpdate(
      this.idFilter(id),
      { $set: entity as Document },
      { returnDocument: "after" });
    const updatedEntity = res.ok === 1 ? res.value : null;
    return updatedEntity ? this.mapId(updatedEntity) as T : null as T;
  };
  
  public async delete(id: string): Promise<boolean> {
    const res = await this.collection().deleteOne(this.idFilter(id));
    return res.deletedCount === 1;
  };

  private mapIds(entities: any[]): any[] {
    return entities.map(e => this.mapId(e));
  }

  private mapId(entity: any): any {
    const { _id, ...rest } = entity;
    return {
      id: _id.toString(), // convert ObjectId to string
      ...rest,
    };
  }

  private idFilter(id: string) {
    return { _id: new ObjectId(id) };
  }

  private collection() {
    return db.instance().collection(this.collectionName);
  }
}