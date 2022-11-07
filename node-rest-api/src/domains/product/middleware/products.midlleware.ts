import { Request, Response, NextFunction } from 'express';
import { validate } from '../../../common/validation/validation';
import { postProductZod, putProductZod } from '../models/product.model';

export const validatePost = (req: Request, res: Response, next: NextFunction) => {
  const result = validate(req.body, postProductZod);
  if (result.success) {
    next();
  }
  else {
    res.status(422).json({ errors: result.errors })
  }
}

export const validateUpdate = (req: Request, res: Response, next: NextFunction) => {
  const result = validate(req.body, putProductZod);
  if (result.success) {
    next();
  }
  else {
    res.status(422).json({ errors: result.errors })
  }
}