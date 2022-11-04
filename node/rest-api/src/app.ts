import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import * as expressWinston from 'express-winston';
import productsRouter from './domains/product/products.router';
import { errorLogger, errorHandler } from './common/error/error.handler';
import loggerOptions from './common/logging/express.logger.options';


const app = express();

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

export default app;