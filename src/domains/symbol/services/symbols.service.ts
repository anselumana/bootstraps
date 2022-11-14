import { IRepository } from "../../../common/interfaces/repository.interface";
import { Symbol } from "../models/symbol.model";
import { SymbolsRepository } from "../repositories/symbols.repository";


export class SymbolsService {
  private repository: IRepository<Symbol>;

  constructor() {
    this.repository = new SymbolsRepository();
  }

  public async list() {
    return await this.repository.list();
  }
  public async get(id: string) {
    return await this.repository.get(id);
  }
  public async create(symbol: Omit<Symbol, "id">) {
    return await this.repository.create(symbol);
  }
  public async update(id: string, symbol: Omit<Symbol, "id">) {
    return await this.repository.update(id, symbol);
  }
  public async delete(id: string) {
    return await this.repository.delete(id);
  }
}