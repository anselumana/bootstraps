import express from "express";
import { formatRes } from "../utils/http.utils";

export function defaultErrorHandler(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  res.status(500).send(formatRes(null, err.message));
}

export function errorLogger(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  console.error(err.stack);
  next(err);
}