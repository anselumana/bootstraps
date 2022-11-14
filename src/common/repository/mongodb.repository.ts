import moment from "moment";
import { ObjectId, OptionalId, Document, Db } from "mongodb";
import { IRepository } from "../interfaces/repository.interface";
import { Entity, TimestampedEntity, WithId } from "../models/base.models";

/**
 * Abstract class that provides access to the
 * mongodb collection identified by its name.
 */
export abstract class MongoDbBase {
  private db: Db;
  private collectionName: string;

  constructor(db: Db, collectionName: string) {
    this.db = db;
    this.collectionName = collectionName;
  }

  /**
   * @returns the mongodb collection.
   */
  protected collection() {
    return this.db.collection(this.collectionName);
  }
}

/**
 * Abstract class that extends MongoDbBase providing
 * extra functionality to mongodb repositories.
 */
export abstract class MongoDbBaseWithUtils extends MongoDbBase {
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
export class MongoDbRepository<T extends WithId> extends MongoDbBaseWithUtils implements IRepository<T> {
  public async list(): Promise<T[]> {
    const entities = await this.collection().find().toArray();
    return this.mapIds(entities) as T[];
  }

  public async get(id: string): Promise<T> {
    const entity = await this.collection().findOne(this.idFilter(id));
    return this.mapId(entity) as T;
  }

  public async create(entity: Omit<T, "id"> | Omit<T, any>): Promise<string> {
    const { insertedId } = await this.collection().insertOne(entity as OptionalId<Document>);
    return insertedId.toString();
  };

  public async update(entityId: string, entity: Omit<T, "id"> | Omit<T, any>): Promise<T | null> {
    const e = await this.get(entityId);
    if (!e) {
      return null;
    }
    const { id, ...rest } = e;
    const toUpdate = {
      ...rest,
      ...entity,
    };
    const res = await this.collection().findOneAndUpdate(
      this.idFilter(entityId),
      { $set: toUpdate as Document },
      { returnDocument: "after" });
    const updatedEntity = res.ok === 1 ? res.value : null;
    return this.mapId(updatedEntity) as T;
  };

  public async delete(id: string): Promise<boolean> {
    const res = await this.collection().deleteOne(this.idFilter(id));
    return res.deletedCount === 1;
  };
}


/**
 * Generic implementation of mongodb repository pattern
 * for `TimestampedEntity` types.
 */
export class MongoDbEntityRepository<T extends TimestampedEntity> extends MongoDbRepository<T> {
  public override async create(entity: Omit<T, "id"|"created"|"updated">): Promise<string> {
    const enriched: Omit<T, "id"|"created"|"updated"> = {
      ...entity,
      created: moment().valueOf(),
      updated: null,
    };
    return await super.create(enriched);
  }

  public override async update(id: string, entity: Omit<T, "id"|"created"|"updated">): Promise<T | null> {
    const enriched: Omit<T, "id"|"created"|"updated"> = {
      ...entity,
      updated: moment().valueOf(),
    };
    return await super.update(id, enriched);
  }
}
