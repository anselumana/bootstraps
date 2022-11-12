import logger from "../logging/logger";


export const exit = (message: string) => {
  logger.error(`unable to start app: ${message}`);
  process.exit(1);
}