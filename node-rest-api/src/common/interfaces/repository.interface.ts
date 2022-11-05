

export interface IRepository<T> {
  list: () => Promise<T[]>;
  get: (id: string) => Promise<T | null>;
  create: (entity: T) => Promise<string>;
  update: (id: string, entity: T) => Promise<T | null>;
  delete: (id: string) => Promise<boolean>;
}