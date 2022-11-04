import { Request, Response, NextFunction } from 'express';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

export class ProductsController {
  productsService: ProductsService;

  constructor() {
    this.productsService = new ProductsService();
  }

  async list(req: Request, res: Response<Product[]>, next: NextFunction) {
    try {
      const products = await this.productsService.list();
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  async get(req: Request, res: Response<Product>, next: NextFunction) {
    try {
      const product = await this.productsService.get(req.params.id);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json();
      }
    } catch (err) {
      next(err);
    }
  }

  async post(req: Request, res: Response<{ id: string }>, next: NextFunction) {
    try {
      const productId = await this.productsService.create(req.body);
      res.status(201).json({ id: productId });
    } catch (err) {
      next(err);
    }
  }

  async put(req: Request, res: Response<Product>, next: NextFunction) {
    try {
      const updatedProduct = await this.productsService.update(req.params.id, req.body);
      if (updatedProduct) {
        res.status(200).json(updatedProduct);
      } else {
        res.status(404).json();
      }
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response<undefined>, next: NextFunction) {
    try {
      const ok = await this.productsService.delete(req.params.id);
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