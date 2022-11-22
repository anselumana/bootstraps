import { Request, Response, NextFunction } from 'express';
import { IRepository } from '../../../common/interfaces/repository.interface';
import { Identifiable } from '../../../common/models/base.models';
import { IdParams, Message } from '../../../common/models/http.models';
import ExchangesMapper from '../mapper/exchanges.mapper';
import { GetExchange, PostExchange, PutExchange } from '../models/exchange.dto.models';
import { Exchange } from '../models/exchange.model';
import { ExchangesRepository } from '../repositories/exchanges.repository';

export class ExchangesController {
  private exchangesRepository: IRepository<Exchange>;

  constructor() {
    this.exchangesRepository = new ExchangesRepository();
  }

  async find(req: Request<{}, GetExchange[], {}>, res: Response<GetExchange[]>, next: NextFunction) {
    try {
      const exchanges = await this.exchangesRepository.find();
      res.status(200).json(exchanges.map(s => ExchangesMapper.toGetDto(s)));
    } catch (err) {
      next(err);
    }
  }

  async get(req: Request<IdParams, GetExchange, {}>, res: Response<GetExchange>, next: NextFunction) {
    try {
      const exchange = await this.exchangesRepository.findOneById(req.params.id);
      if (exchange) {
        res.status(200).json(ExchangesMapper.toGetDto(exchange));
      } else {
        res.status(404).json();
      }
    } catch (err) {
      next(err);
    }
  }

  async post(req: Request<{}, Identifiable | Message, PostExchange>, res: Response<Identifiable | Message>, next: NextFunction) {
    try {
      const exchange: Omit<Exchange, "id"|"created"|"updated"> = {
        ...req.body,
        userId: "",
      };
      if (await this.exchangeAlreadyExists(exchange)) {
        res.status(400).json({ message: `Exchange '${exchange.name}' already exists` });
        return;
      }
      const exchangeId = await this.exchangesRepository.create(exchange);
      res.status(201).json({ id: exchangeId });
    } catch (err) {
      next(err);
    }
  }

  async put(req: Request<IdParams, GetExchange | Message, PutExchange>, res: Response<GetExchange | Message>, next: NextFunction) {
    try {
      const exchange: Omit<Exchange, "id"|"created"|"updated"> = {
        ...req.body,
        userId: "",
      };
      if (await this.exchangeAlreadyExists(exchange)) {
        res.status(400).json({ message: `Exchange '${exchange.name}' already exists` });
        return;
      }
      const updatedExchange = await this.exchangesRepository.update(req.params.id, exchange);
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
      const ok = await this.exchangesRepository.delete(req.params.id);
      if (ok) {
        res.status(204).json();
      } else {
        res.status(404).json();
      }
    } catch (err) {
      next(err);
    }
  }
  
  async exchangeAlreadyExists(exchange: Partial<Exchange>): Promise<boolean> {
    return await this.exchangesRepository.findOne(exchange) != null;
  }
}