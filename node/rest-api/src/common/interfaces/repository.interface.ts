

export interface IRepository<T> {
  list: () => Promise<T[]>;
  get: (id: string) => Promise<T | undefined>;
  create: (entity: T) => Promise<string>;
  update: (id: string, entity: T) => Promise<T | undefined>;
  delete: (id: string) => Promise<boolean>;
}