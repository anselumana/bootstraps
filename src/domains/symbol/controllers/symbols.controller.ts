import { Request, Response, NextFunction } from 'express';
import { WithId } from '../../../common/models/base.models';
import { PostSymbol, PutSymbol } from '../models/symbol.io.models';
import { Symbol } from '../models/symbol.model';
import { SymbolsService } from '../services/symbols.service';

export class SymbolsController {
  symbolsService: SymbolsService;

  constructor() {
    this.symbolsService = new SymbolsService();
  }

  async list(req: Request<{}, Symbol[], {}>, res: Response<Symbol[]>, next: NextFunction) {
    try {
      const symbols = await this.symbolsService.list();
      res.status(200).json(symbols);
    } catch (err) {
      next(err);
    }
  }

  async get(req: Request<WithId, Symbol, {}>, res: Response<Symbol>, next: NextFunction) {
    try {
      const symbol = await this.symbolsService.get(req.params.id);
      if (symbol) {
        res.status(200).json(symbol);
      } else {
        res.status(404).json();
      }
    } catch (err) {
      next(err);
    }
  }

  async post(req: Request<{}, WithId, PostSymbol>, res: Response<WithId>, next: NextFunction) {
    try {
      const symbol: Omit<Symbol, "id"|"created"|"updated"> = {
        ...req.body,
        userId: "",
      };
      const symbolId = await this.symbolsService.create(symbol);
      res.status(201).json({ id: symbolId });
    } catch (err) {
      next(err);
    }
  }

  async put(req: Request<WithId, Symbol, PutSymbol>, res: Response<Symbol>, next: NextFunction) {
    try {
      const symbol: Omit<Symbol, "id"|"created"|"updated"> = {
        ...req.body,
        userId: "",
      };
      const updatedSymbol = await this.symbolsService.update(req.params.id, symbol);
      if (updatedSymbol) {
        res.status(200).json(updatedSymbol);
      } else {
        res.status(404).json();
      }
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request<WithId, undefined, {}>, res: Response<undefined>, next: NextFunction) {
    try {
      const ok = await this.symbolsService.delete(req.params.id);
      if (ok) {
        res.status(204).json();
      } else {
        res.status(404).json();
      }
    } catch (err) {
      next(err);
    }
  }
}