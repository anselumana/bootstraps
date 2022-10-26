import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import * as expressWinston from 'express-winston';
import * as http from 'http';
import cors from 'cors';
import { ProductsRoutes } from './domains/product/products.routes.config';
import { defaultErrorHandler, errorLogger } from './common/error/error.handler';
import { AppConfig } from './common/config/app.config';
import init from './common/utils/init.utils';
import winston from 'winston';


const main = async () => {
  const prefix = "[init]";

  const app: express.Application = express();

  const server: http.Server = http.createServer(app);

  try {
    // app initialization
    await init();
  }
  catch (err: any) {
    console.error(`${prefix} ${err}`);
    process.exit(1);
  }

  app.use(express.json());
  app.use(cors());;

  app.use(expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.json(),
      winston.format.prettyPrint(),
      winston.format.colorize({ all: true })
    ),
    meta: false,
  }));

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
    console.log(`${prefix} server listening on port ${port}`);
  });
}

main();
