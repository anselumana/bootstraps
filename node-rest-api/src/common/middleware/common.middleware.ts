import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import logger from "../logging/logger";


const _logger = logger.child({});

export const httpLogger = (req: Request, res: Response, next: NextFunction) => {
  _logger.info(`${req.method} ${req.path}`);
  next();
}

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const id = req?.params?.id;
  if (!id) {
    next();
  }
  try {
    new ObjectId(id);
    next();
  }
  catch (err: any) {
    res.status(404).send();
  }
}