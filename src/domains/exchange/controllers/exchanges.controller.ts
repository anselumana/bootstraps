import { Request, Response, NextFunction } from 'express';
import { Identifiable } from '../../../common/models/base.models';
import { IdParams } from '../../../common/models/http.models';
import ExchangesMapper from '../mapper/exchanges.mapper';
import { GetExchange, PostExchange, PutExchange } from '../models/exchange.dto.models';
import { Exchange } from '../models/exchange.model';
import { ExchangesService } from '../services/exchanges.service';

export class ExchangesController {
  exchangesService: ExchangesService;

  constructor() {
    this.exchangesService = new ExchangesService();
  }

  async list(req: Request<{}, GetExchange[], {}>, res: Response<GetExchange[]>, next: NextFunction) {
    try {
      const exchanges = await this.exchangesService.list();
      res.status(200).json(exchanges.map(s => ExchangesMapper.toGetDto(s)));
    } catch (err) {
      next(err);
    }
  }

  async get(req: Request<IdParams, GetExchange, {}>, res: Response<GetExchange>, next: NextFunction) {
    try {
      const exchange = await this.exchangesService.get(req.params.id);
      if (exchange) {
        res.status(200).json(ExchangesMapper.toGetDto(exchange));
      } else {
        res.status(404).json();
      }
    } catch (err) {
      next(err);
    }
  }

  async post(req: Request<{}, Identifiable, PostExchange>, res: Response<Identifiable>, next: NextFunction) {
    try {
      const exchange: Omit<Exchange, "id"|"created"|"updated"> = {
        ...req.body,
        userId: "",
      };
      const exchangeId = await this.exchangesService.create(exchange);
      res.status(201).json({ id: exchangeId });
    } catch (err) {
      next(err);
    }
  }

  async put(req: Request<IdParams, GetExchange, PutExchange>, res: Response<GetExchange>, next: NextFunction) {
    try {
      const exchange: Omit<Exchange, "id"|"created"|"updated"> = {
        ...req.body,
        userId: "",
      };
      const updatedExchange = await this.exchangesService.update(req.params.id, exchange);
      if (updatedExchange) {
        res.status(200).json(ExchangesMapper.toGetDto(updatedExchange));
      } else {
        res.status(404).json();
      }
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request<IdParams, undefined, {}>, res: Response<undefined>, next: NextFunction) {
    try {
      const ok = await this.exchangesService.delete(req.params.id);
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