import { CommonRoutesConfig } from '../../common/common.routes.config';
import express from 'express';
import { ProductsController } from './controllers/products.controller';
import { ProductsMiddleware } from './middleware/products.midlleware';

export class ProductsRoutes extends CommonRoutesConfig {

  constructor(app: express.Application) {
    super(app, 'ProductsRoutes');
  }

  public configureRoutes(): express.Application {
    const controller = new ProductsController();
    const middleware = new ProductsMiddleware();
    // Note: remember to call `obj.method.bind(obj)`,
    // or `this` inside the method will be undefined.
    // https://stackoverflow.com/questions/50400776/node-js-es6-class-unable-to-call-class-method-from-within-class-method-when-usin
    this.app.route(`/products`)
      .get(
        controller.list.bind(controller),
      )
      .post(
        middleware.validatePostProduct.bind(middleware),
        controller.post.bind(controller),
      )
      .delete(
        controller.delete.bind(controller),
      )
    this.app.route(`/products/:id`)
      .get(
        controller.get.bind(controller)
      )
      .put(
        middleware.validateUpdateProduct.bind(middleware),
        controller.put.bind(controller),
      )
    return this.app;
  }
}