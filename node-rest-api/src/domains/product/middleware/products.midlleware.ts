import { Request, Response, NextFunction } from 'express';
import { validate } from '../../../common/validation/validation';
import { postRequestProductZod, putRequestProductZod } from '../models/product.io.models';

export const validatePost = (req: Request, res: Response, next: NextFunction) => {
  const result = validate(req.body, postRequestProductZod);
  if (result.success) {
    next();
  }
  else {
    res.status(422).json({ errors: result.errors });
  }
}

export const validateUpdate = (req: Request, res: Response, next: NextFunction) => {
  const result = validate(req.body, putRequestProductZod);
  if (result.success) {
    next();
  }
  else {
    res.status(422).json({ errors: result.errors });
  }
}