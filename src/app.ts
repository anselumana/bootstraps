import express, { Request, Response, NextFunction } from 'express';
import helmet from "helmet";
import cors from 'cors';
import { httpLogger } from './common/middleware/common.middleware';
import { errorHandler } from './common/error/error.handler';
import * as swagger from "swagger-ui-express";
import * as swaggerJson from "./swagger/static/swagger.json";
import symbolsRouter from './domains/symbol/symbols.router';
import exchangesRouter from './domains/exchange/exchanges.router';


const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(httpLogger);

app.use('/docs', swagger.serve, swagger.setup(swaggerJson));

app.use("/symbols", symbolsRouter());
app.use("/exchanges", exchangesRouter());
app.get("/ping", (req: Request, res: Response) => res.status(200).json({ message: "pong" }));

app.use((req: Request, res: Response, next: NextFunction) => res.status(404).send());

app.use(errorHandler);


export default app;