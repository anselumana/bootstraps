import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { validate } from '../../../common/validation/validation';
import { postProductZod } from '../models/product.model';

export class ProductsMiddleware {
  public async validatePost(req: Request, res: Response, next: NextFunction) {
    const result = validate(req.body, postProductZod);
    if (result.success) {
      next();
    }
    else {
      res.status(422).json({ errors: result.errors })
    }
  }

  public async validateUpdate(req: Request, res: Response, next: NextFunction) {
    // const msg = await this._validateUpdate(req.body);
    // msg ? res.status(400).json({ message: msg }) : next();
  }
}