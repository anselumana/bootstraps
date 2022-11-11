import * as http from 'http';
import app from './app';
import config from './common/config/config';
import logger from './common/logging/logger';
import { exit } from './common/utils/common.utils';
import db from './common/db/db';


db.connect()
  .then(() => {
    const server = http.createServer(app());

    server.listen(config.port, () => {
      logger.info(`server listening on port ${config.port}`);
    });
  })
  .catch((err: any) => {
    exit(err.message);
  });
