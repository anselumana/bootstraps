import { IRepository } from "../../../common/interfaces/repository.interface";
import { Exchange } from "../models/exchange.model";
import { ExchangesRepository } from "../repositories/exchanges.repository";


export class ExchangesService {
  private repository: IRepository<Exchange>;

  constructor() {
    this.repository = new ExchangesRepository();
  }

  public async list() {
    return await this.repository.list();
  }
  public async get(id: string) {
    return await this.repository.get(id);
  }
  public async create(exchange: Omit<Exchange, "id"|"created"|"updated">) {
    return await this.repository.create(exchange);
  }
  public async update(id: string, exchange: Omit<Exchange, "id"|"created"|"updated">) {
    return await this.repository.update(id, exchange);
  }
  public async delete(id: string) {
    return await this.repository.delete(id);
  }
}