import { IRepository } from "../../../common/interfaces/repository.interface";
import { Product } from "../../../common/model/model";


export class ProductsRepository implements IRepository<Product> {
  list!: () => Promise<Product[]>;
  get!: (id: string) => Promise<Product | undefined>;
  create!: (entity: Product) => Promise<string>;
  update!: (id: string, entity: Product) => Promise<Product>;
  delete!: (id: string) => Promise<boolean>;
}