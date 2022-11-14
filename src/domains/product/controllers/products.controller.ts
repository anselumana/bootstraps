import { Request, Response, NextFunction } from 'express';
import { WithId } from '../../../common/models/base.models';
import { PostProduct, PutProduct } from '../models/product.io.models';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

export class ProductsController {
  productsService: ProductsService;

  constructor() {
    this.productsService = new ProductsService();
  }

  async list(req: Request<{}, Product[], {}>, res: Response<Product[]>, next: NextFunction) {
    try {
      const products = await this.productsService.list();
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  async get(req: Request<WithId, Product, {}>, res: Response<Product>, next: NextFunction) {
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

  async post(req: Request<{}, WithId, PostProduct>, res: Response<WithId>, next: NextFunction) {
    try {
      const product: Omit<Product, "id"> = {
        ...req.body,
        userId: "",
        created: null,
        updated: null,
      };
      const productId = await this.productsService.create(product);
      res.status(201).json({ id: productId });
    } catch (err) {
      next(err);
    }
  }

  async put(req: Request<WithId, Product, PutProduct>, res: Response<Product>, next: NextFunction) {
    try {
      const product: Omit<Product, "id"> = {
        ...req.body,
        userId: "",
        created: null,
        updated: null,
      };
      const updatedProduct = await this.productsService.update(req.params.id, product);
      if (updatedProduct) {
        res.status(200).json(updatedProduct);
      } else {
        res.status(404).json();
      }
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request<WithId, undefined, {}>, res: Response<undefined>, next: NextFunction) {
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