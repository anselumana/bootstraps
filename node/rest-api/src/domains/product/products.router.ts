import express from "express";
import CommonMiddleware from "../../common/middleware/common.middleware";
import { ProductsController } from "./controllers/products.controller";
import { ProductsMiddleware } from "./middleware/products.midlleware";


const productsRouter = () => {
  const controller = new ProductsController();
  const middleware = new ProductsMiddleware();
  const commonMiddleware = new CommonMiddleware();
  const router = express.Router();
  router.route("/")
    .get(
      controller.list.bind(controller),
    )
    .post(
      middleware.validatePost.bind(middleware),
      controller.post.bind(controller),
    )
  router.route(`/:id`)
    .all(
      commonMiddleware.validateId.bind(commonMiddleware),
    )
    .get(
      controller.get.bind(controller)
    )
    .put(
      middleware.validateUpdate.bind(middleware),
      controller.put.bind(controller),
    )
    .delete(
      controller.delete.bind(controller),
    )
  return router;
}

export default productsRouter;
