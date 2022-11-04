import * as dotenv from 'dotenv';
dotenv.config();
import * as http from 'http';
import express from 'express';
import cors from 'cors';
import * as expressWinston from 'express-winston';
import init from './common/utils/init.utils';
import { AppConfig } from './common/config/app.config';
import productsRouter from './domains/product/products.router';
import { errorLogger, errorHandler } from './common/error/error.handler';
import loggerOptions from './common/logging/express.logger.options';


const main = async () => {
  const app = express();

  const server = http.createServer(app);

  try {
    // app initialization
    await init();
  }
  catch (err: any) {
    console.error(`[init] ${err}`);
    process.exit(1);
  }

  app.use(express.json());
  app.use(cors());;
  app.use(expressWinston.logger(loggerOptions));

  // routes
  app.use("/products", productsRouter());
  
  // ping route for debug
  app.get('/ping', (req: express.Request, res: express.Response) => {
    res.status(200).json({
      message: "pong",
    });
  });

  // error handling middleware
  app.use(errorLogger);
  app.use(errorHandler);

  const port = AppConfig.current().port;

  server.listen(port, () => {
    console.log(`[init] server listening on port ${port}`);
  });
}

main();
