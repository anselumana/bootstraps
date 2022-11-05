import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { validate } from '../../../common/validation/validation';
import { postProductZod, putProductZod } from '../models/product.model';

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
    const result = validate(req.body, putProductZod);
    if (result.success) {
      next();
    }
    else {
      res.status(422).json({ errors: result.errors })
    }
  }
}