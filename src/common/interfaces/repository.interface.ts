

export interface IReadRepository<T> {
  list: () => Promise<T[]>;
  get: (id: string) => Promise<T | null>;
}

export interface IWriteRepository<T> {
  create: (entity: T) => Promise<string>;
  update: (id: string, entity: T) => Promise<T | null>;
  delete: (id: string) => Promise<boolean>;
}

export interface IRepository<T> extends IReadRepository<T>, IWriteRepository<T> {}