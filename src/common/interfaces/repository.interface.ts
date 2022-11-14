import { Identifiable } from "../models/base.models";


export interface IReadRepository<T extends Identifiable> {
  list: () => Promise<T[]>;
  get: (id: string) => Promise<T | null>;
}

export interface IWriteRepository<T extends Identifiable> {
  create: (entity: Omit<T, any>) => Promise<string>;
  update: (id: string, entity: Omit<T, any>) => Promise<T | null>;
  delete: (id: string) => Promise<boolean>;
}

export interface IRepository<T extends Identifiable> extends IReadRepository<T>, IWriteRepository<T> {}
