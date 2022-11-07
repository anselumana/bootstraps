import * as http from 'http';
import app from './app';
import config from './common/config/config';
import logger from './common/logging/logger';
import init from './init';


const _logger = logger.child({});

init()
  .then(() => {
    const server = http.createServer(app());

    const port = config.config().port;
    
    server.listen(port, () => {
      _logger.info(`server listening on port ${port}`);
    });
  })
  .catch((err: any) => {
    _logger.error(`unable to start app: ${err.message}`);
    process.exit(1);
  });