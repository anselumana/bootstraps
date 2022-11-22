import { Request, Response, NextFunction } from 'express';
import { Identifiable } from '../../../common/models/base.models';
import { IdParams } from '../../../common/models/http.models';
import SymbolsMapper from '../mapper/symbols.mapper';
import { GetSymbol, PostSymbol, PutSymbol } from '../models/symbol.dto.models';
import { Symbol } from '../models/symbol.model';
import { SymbolsService } from '../services/symbols.service';

export class SymbolsController {
  symbolsService: SymbolsService;

  constructor() {
    this.symbolsService = new SymbolsService();
  }

  async list(req: Request<{}, GetSymbol[], {}>, res: Response<GetSymbol[]>, next: NextFunction) {
    try {
      const symbols = await this.symbolsService.list();
      res.status(200).json(symbols.map(s => SymbolsMapper.toGetDto(s)));
    } catch (err) {
      next(err);
    }
  }

  async get(req: Request<IdParams, GetSymbol, {}>, res: Response<GetSymbol>, next: NextFunction) {
    try {
      const symbol = await this.symbolsService.get(req.params.id);
      if (symbol) {
        res.status(200).json(SymbolsMapper.toGetDto(symbol));
      } else {
        res.status(404).json();
      }
    } catch (err) {
      next(err);
    }
  }

  async post(req: Request<{}, Identifiable, PostSymbol>, res: Response<Identifiable>, next: NextFunction) {
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

  async put(req: Request<IdParams, GetSymbol, PutSymbol>, res: Response<GetSymbol>, next: NextFunction) {
    try {
      const symbol: Omit<Symbol, "id"|"created"|"updated"> = {
        ...req.body,
        userId: "",
      };
      const updatedSymbol = await this.symbolsService.update(req.params.id, symbol);
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