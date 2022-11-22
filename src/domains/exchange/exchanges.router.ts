import express, { Router } from "express";
import { validateId } from "../../common/middleware/common.middleware";
import { ExchangesController } from "./controllers/exchanges.controller";
import { validatePost, validateUpdate } from "./middleware/exchanges.midlleware";


const exchangesRouter = (): Router => {
  const controller = new ExchangesController();
  const router = express.Router();
  router.route("/")
    .get(
      controller.find.bind(controller),
    )
    .post(
      validatePost,
      controller.post.bind(controller),
    )
  router.route(`/:id`)
    .all(
      validateId,
    )
    .get(
      controller.get.bind(controller)
    )
    .put(
      validateUpdate,
      controller.put.bind(controller),
    )
    .delete(
      controller.delete.bind(controller),
    )
  return router;
}

export default exchangesRouter;
