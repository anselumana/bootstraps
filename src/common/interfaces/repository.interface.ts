import { WithId } from "../models/base.models";


export interface IReadRepository<T extends WithId> {
  list: () => Promise<T[]>;
  get: (id: string) => Promise<T | null>;
}

export interface IWriteRepository<T extends WithId> {
  create: (entity: Omit<T, "id">) => Promise<string>;
  update: (id: string, entity: Omit<T, "id">) => Promise<T | null>;
  delete: (id: string) => Promise<boolean>;
}

export interface IRepository<T extends WithId> extends IReadRepository<T>, IWriteRepository<T> {}