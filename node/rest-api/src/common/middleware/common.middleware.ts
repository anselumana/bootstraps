import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";

export default class CommonMiddleware {
  public async validateId(req: Request, res: Response, next: NextFunction) {
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
}