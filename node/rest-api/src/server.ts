import * as http from 'http';
import app from './app';
import { AppConfig } from './common/config/app.config';
import init from './common/utils/init.utils';


init()
  .then(() => {
    const server = http.createServer(app);
    const port = AppConfig.current().port;
    server.listen(port, () => {
      console.log(`[init] server listening on port ${port}`);
    });
  })
  .catch((err: any) => {
    console.error(`[init] ${err}`);
    process.exit(1);
  });