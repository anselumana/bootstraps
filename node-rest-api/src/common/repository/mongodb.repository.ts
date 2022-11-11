import { ObjectId, OptionalId, Document } from "mongodb";
import db from "../db/db";
import { IReadRepository, IRepository } from "../interfaces/repository.interface";

/**
 * Abstract class that provides access to the
 * mongodb collection identified by its name.
 */
abstract class MongoDbNamedCollection {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }
  
  /**
   * @returns the mongodb collection.
   */
  protected collection() {
    return db.instance().collection(this.collectionName);
  }
}

/**
 * Abstract class that provides base functionality
 * to mongodb repositories.
 */
export abstract class MongoDbBase extends MongoDbNamedCollection {
  /**
   * converts each entity from { _id: ObjectId, ... } to { id: string, ... }.
   * @param entities array of input entities
   * @returns array of converted entities
   */
  protected mapIds(entities: any[]): any[] {
    return entities.map(e => this.mapId(e));
  }
  
  /**
   * convert entity from { _id: ObjectId, ... } to { id: string, ... }.
   * @param entity input entity
   * @returns converted entity
   */
  protected mapId(entity: any): any {
    if (!entity) {
      return entity;
    }
    const { _id, ...rest } = entity;
    return {
      id: _id.toString(), // convert ObjectId to string
      ...rest,
    };
  }

  protected idFilter(id: string) {
    return { _id: new ObjectId(id) };
  }
}

/**
 * Generic implementation of mongodb repository pattern.
 */
export class MongoDbRepository<T> extends MongoDbBase implements IRepository<T> {
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
    return this.mapId(updatedEntity) as T;
  };
  
  public async delete(id: string): Promise<boolean> {
    const res = await this.collection().deleteOne(this.idFilter(id));
    return res.deletedCount === 1;
  };
}