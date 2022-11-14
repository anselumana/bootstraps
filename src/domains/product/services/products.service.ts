import { IRepository } from "../../../common/interfaces/repository.interface";
import { Product } from "../models/product.model";
import { ProductsRepository } from "../repositories/products.repository";


export class ProductsService {
  private repository: IRepository<Product>;

  constructor() {
    this.repository = new ProductsRepository();
  }

  public async list() {
    return await this.repository.list();
  }
  public async get(id: string) {
    return await this.repository.get(id);
  }
  public async create(product: Omit<Product, "id">) {
    return await this.repository.create(product);
  }
  public async update(id: string, product: Omit<Product, "id">) {
    return await this.repository.update(id, product);
  }
  public async delete(id: string) {
    return await this.repository.delete(id);
  }
}