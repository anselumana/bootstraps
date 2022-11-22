import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import logger from "../logging/logger";
import { isValidObjectId } from "../validation/mongodb.validation";


const _logger = logger.child({});

export const httpLogger = (req: Request, res: Response, next: NextFunction) => {
  // ignore swagger docs requests
  if (req.path.startsWith("/docs")) {
    next();
    return;
  }
  _logger.info(`${req.method} ${req.path}`);
  next();
}

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const id = req?.params?.id;
  if (isValidObjectId(id)) {
    next();
  }
  else {
    res.status(404).send();
  }
}