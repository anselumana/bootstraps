import { Request, Response, NextFunction } from 'express';
import { validate } from '../../../common/validation/validation';
import { postSymbolSchema, putSymbolSchema } from '../models/symbol.dto.models';

export const validatePost = (req: Request, res: Response, next: NextFunction) => {
  const result = validate(req.body, postSymbolSchema);
  if (result.success) {
    next();
  }
  else {
    res.status(422).json({ errors: result.errors });
  }
}

export const validateUpdate = (req: Request, res: Response, next: NextFunction) => {
  const result = validate(req.body, putSymbolSchema);
  if (result.success) {
    next();
  }
  else {
    res.status(422).json({ errors: result.errors });
  }
}