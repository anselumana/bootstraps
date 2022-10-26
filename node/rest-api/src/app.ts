import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import * as http from 'http';
import cors from 'cors';
import { ProductsRoutes } from './domains/product/products.routes.config';
import { defaultErrorHandler, errorLogger } from './common/error/error.handler';
import { AppConfig } from './common/config/app.config';
import init from './common/utils/init.utils';

const main = async () => {
  const app: express.Application = express();

  const server: http.Server = http.createServer(app);

  // app initialization
  await init();

  app.use(express.json());
  app.use(cors());

  // routes registration
  new ProductsRoutes(app);
  
  app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send("ping ok");
  });

  // error handling middleware
  app.use(errorLogger);
  app.use(defaultErrorHandler);

  const port = AppConfig.current().port;

  server.listen(port, () => {
    console.log(`server listening on port ${port}`);
  });
}

main();
