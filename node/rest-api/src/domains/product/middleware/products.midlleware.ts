import express from 'express';
import { formatRes } from '../../../common/utils/http.utils';

export class ProductsMiddleware {
  public async validatePostProduct(req: express.Request, res: express.Response, next: express.NextFunction) {
    const msg = await validatePostProductInternal(req.body);
    if (msg) {
      res.status(400).send(formatRes(null, msg));
    }
    else {
      next();
    }
  }
  
  public async validateUpdateProduct(req: express.Request, res: express.Response, next: express.NextFunction) {
    const msg = await validateUpdateProductInternal(req.body);
    if (msg) {
      res.status(400).send(formatRes(null, msg));
    }
    else {
      next();
    }
  }
}

const validatePostProductInternal = (body: any) => {
  // add needed validation rules
  if (!body) {
    return "body is empty";
  }
  return null;
}

const validateUpdateProductInternal = (body: any) => {
  // add needed validation rules
  if (!body) {
    return "body is empty";
  }
  return null;
}