import express from "express";

export function errorHandler(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  res.status(500).send({ message: "unhandled error occured" });
}

export function errorLogger(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  console.error(err.stack);
  next(err);
}