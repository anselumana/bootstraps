import express from 'express';
import { formatRes } from '../../../common/utils/http.utils';
import { ProductsService } from '../services/products.service';

export class ProductsController {
  productsService: ProductsService;

  constructor() {
    this.productsService = new ProductsService();
  }

  async list(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const products = await this.productsService.list();
      res.status(200).json(formatRes(products));
    } catch (err) {
      next(err);
    }
  }

  async get(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const product = await this.productsService.get(req.params.id);
      if (product) {
        res.status(200).json(formatRes(product));
      } else {
        res.status(404).json(formatRes(null, "not found"));
      }
    } catch (err) {
      next(err);
    }
  }

  async post(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const productId = await this.productsService.create(req.body);
      res.status(201).json(formatRes({ id: productId }));
    } catch (err) {
      next(err);
    }
  }

  async put(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const updatedProduct = await this.productsService.update(req.params.id, req.body);
      if (updatedProduct) {
        res.status(200).json(formatRes(updatedProduct));
      } else {
        res.status(404).json(formatRes(null, "not found"));
      }
    } catch (err) {
      next(err);
    }
  }

  async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const ok = await this.productsService.delete(req.params.id);
      if (ok) {
        res.status(204).json();
      } else {
        res.status(404).json(formatRes(null, "not found"));
      }
    } catch (err) {
      next(err);
    }
  }
}