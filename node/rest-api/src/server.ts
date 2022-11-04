import * as http from 'http';
import app from './app';
import config from './common/config/config';
import init from './init';


init()
  .then(() => {
    const server = http.createServer(app());

    const port = config.config().port;
    
    server.listen(port, () => {
      console.log(`[init] server listening on port ${port}`);
    });
  })
  .catch((err: any) => {
    console.error(`[init] ${err}`);
    process.exit(1);
  });