import { IRepository } from "../../../common/interfaces/repository.interface";
import { Product } from "../models/product.model";


export class ProductsMemoryRepository implements IRepository<Product> {
  private readonly products: Product[];
  private counter: number;

  constructor() {
    this.products = [];
    this.counter = 0;
  }

  private increment() {
    this.counter++;
  }

  public async list() {
    return this.products;
  }
  public async get(id: string) {
    return this.products.find(p => p.id === id) || null;
  }
  public async create(entity: Product) {
    const id = this.counter.toString();
    this.products.push({
      ...entity,
      id: id,
    })
    this.increment();
    return id;
  }
  public async update(id: string, entity: Product) {
    let product = await this.get(id);
    if (product) {
      const index = this.products.indexOf(product);
      const newProduct = {
        ...product,
        ...entity,
        id: product.id,
      }
      this.products.splice(index, 1, newProduct);
      return newProduct;
    }
    return null;
  }
  public async delete(id: string) {
    let product = await this.get(id);
    if (product) {
      const index = this.products.indexOf(product);
      this.products.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }
}