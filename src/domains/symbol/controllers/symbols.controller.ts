import { Request, Response, NextFunction } from 'express';
import { IRepository } from '../../../common/interfaces/repository.interface';
import { validateId } from '../../../common/middleware/common.middleware';
import { Identifiable } from '../../../common/models/base.models';
import { IdParams, Message } from '../../../common/models/http.models';
import { isValidObjectId } from '../../../common/validation/mongodb.validation';
import { Exchange } from '../../exchange/models/exchange.model';
import { ExchangesRepository } from '../../exchange/repositories/exchanges.repository';
import SymbolsMapper from '../mapper/symbols.mapper';
import { GetSymbol, PostSymbol, PutSymbol } from '../models/symbol.dto.models';
import { Symbol } from '../models/symbol.model';
import { SymbolsRepository } from '../repositories/symbols.repository';

export class SymbolsController {
  private symbolsRepository: IRepository<Symbol>;
  private exchangesRepository: IRepository<Exchange>;

  constructor() {
    this.symbolsRepository = new SymbolsRepository();
    this.exchangesRepository = new ExchangesRepository();
  }

  async find(req: Request<{}, GetSymbol[], {}>, res: Response<GetSymbol[]>, next: NextFunction) {
    try {
      const symbols = await this.symbolsRepository.find();
      res.status(200).json(symbols.map(s => SymbolsMapper.toGetDto(s)));
    } catch (err) {
      next(err);
    }
  }

  async get(req: Request<IdParams, GetSymbol, {}>, res: Response<GetSymbol>, next: NextFunction) {
    try {
      const symbol = await this.symbolsRepository.findOneById(req.params.id);
      if (symbol) {
        res.status(200).json(SymbolsMapper.toGetDto(symbol));
      } else {
        res.status(404).json();
      }
    } catch (err) {
      next(err);
    }
  }

  async post(req: Request<{}, Identifiable | Message, PostSymbol>, res: Response<Identifiable | Message>, next: NextFunction) {
    try {
      const symbol: Omit<Symbol, "id"|"created"|"updated"> = {
        ...req.body,
        userId: "",
      };
      if (!await this.exchangeExists(symbol.exchangeId)) {
        res.status(400).json({ message: `Exchange with id '${symbol.exchangeId}' not found` })
        return;
      }
      if (await this.symbolAlreadyExists(symbol)) {
        res.status(400).json({ message: `Symbol ${symbol.baseAsset}/${symbol.quoteAsset} already exists in given exchange` });
        return;
      }
      const symbolId = await this.symbolsRepository.create(symbol);
      res.status(201).json({ id: symbolId });
    } catch (err) {
      next(err);
    }
  }

  async put(req: Request<IdParams, GetSymbol | Message, PutSymbol>, res: Response<GetSymbol | Message>, next: NextFunction) {
    try {
      const symbol: Omit<Symbol, "id"|"created"|"updated"> = {
        ...req.body,
        userId: "",
      };
      if (!await this.exchangeExists(symbol.exchangeId)) {
        res.status(400).json({ message: `Exchange with id '${symbol.exchangeId}' not found` })
        return;
      }
      if (await this.symbolAlreadyExists(symbol)) {
        res.status(400).json({ message: `Symbol ${symbol.baseAsset}/${symbol.quoteAsset} already exists in given exchange` });
        return;
      }
      const updatedSymbol = await this.symbolsRepository.update(req.params.id, symbol);
      if (updatedSymbol) {
        res.status(200).json(SymbolsMapper.toGetDto(updatedSymbol));
      } else {
        res.status(404).json();
      }
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request<IdParams, undefined, {}>, res: Response<undefined>, next: NextFunction) {
    try {
      const ok = await this.symbolsRepository.delete(req.params.id);
      if (ok) {
        res.status(204).json();
      } else {
        res.status(404).json();
      }
    } catch (err) {
      next(err);
    }
  }

  private async exchangeExists(exchangeId: string): Promise<boolean> {
    if (isValidObjectId(exchangeId)) {
      return await this.exchangesRepository.findOneById(exchangeId) != null;
    }
    return false;
  }

  private async symbolAlreadyExists(symbol: Partial<Symbol>): Promise<boolean> {
    return await this.symbolsRepository.findOne(symbol) != null;
  }
}