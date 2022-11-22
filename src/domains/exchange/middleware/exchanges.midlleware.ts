import { Request, Response, NextFunction } from 'express';
import { validate } from '../../../common/validation/zod.validation';
import { postExchangeSchema, putExchangeSchema } from '../models/exchange.dto.models';

export const validatePost = (req: Request, res: Response, next: NextFunction) => {
  const result = validate(req.body, postExchangeSchema);
  if (result.success) {
    next();
  }
  else {
    res.status(422).json({ errors: result.errors });
  }
}

export const validateUpdate = (req: Request, res: Response, next: NextFunction) => {
  const result = validate(req.body, putExchangeSchema);
  if (result.success) {
    next();
  }
  else {
    res.status(422).json({ errors: result.errors });
  }
}