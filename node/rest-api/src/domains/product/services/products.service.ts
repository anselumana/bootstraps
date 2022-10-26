import { IRepository } from "../../../common/interfaces/repository.interface";
import { Product } from "../../../common/model/model";
import { ProductsMemoryRepository } from "../repositories/products.memory.repository";


export class ProductsService {
  private repository: IRepository<Product>;

  constructor() {
    this.repository = new ProductsMemoryRepository();
  }

  public async list() {
    return await this.repository.list();
  }
  public async get(id: string) {
    return await this.repository.get(id);
  }
  public async create(product: Product) {
    return await this.repository.create(product);
  }
  public async update(id: string, product: Product) {
    return await this.repository.update(id, product);
  }
  public async delete(id: string) {
    return await this.repository.delete(id);
  }
}