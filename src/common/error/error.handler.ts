import { Request, Response, NextFunction} from "express";
import logger from "../logging/logger";


const _logger = logger.child({});

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  _logger.error(err.stack);
  const message = process.env.NODE_ENV === "prod" ? "unhandled error occured" : err.message;
  res.status(500).json({ message });
}