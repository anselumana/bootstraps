import express from "express";

export function errorHandler(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  const message = process.env.NODE_ENV === "prod" ? "unhandled error occured" : err.message;
  res.status(500).json({ message });
}

export function errorLogger(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  console.error(err.stack);
  next(err);
}