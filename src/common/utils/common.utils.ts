import logger from "../logging/logger";


export const exit = (message: string) => {
  logger.error(`unable to start app: ${message}`);
  process.exit(1);
}

export const isEmpty = (obj: object): boolean => {
  return obj
    && Object.keys(obj).length === 0
    && Object.getPrototypeOf(obj) === Object.prototype
}