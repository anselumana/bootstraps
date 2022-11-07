import express from "express";
import { validateId } from "../../common/middleware/common.middleware";
import { ProductsController } from "./controllers/products.controller";
import { validatePost, validateUpdate } from "./middleware/products.midlleware";


const productsRouter = () => {
  const controller = new ProductsController();
  const router = express.Router();
  router.route("/")
    .get(
      controller.list.bind(controller),
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

export default productsRouter;
