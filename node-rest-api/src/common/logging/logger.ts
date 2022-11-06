import moment from "moment";
import { createLogger, format, transports } from "winston";
const { printf, combine, colorize } = format;


const ts = () => {
  return moment().format("YYYY-MM-DD HH:mm:ss.SSS");
}

const consoleLogs = new transports.Console({
  level: "debug",
  format: combine(
    colorize({ all: true }),
    printf((info) => {
      return `[${ts()}] [${info.service}] ${info.message}`;
    }),
  ),
});

const fileLogs = new transports.File({
  level: "warn",
  filename: "logs/errors.log",
  format: combine(
    printf((info) => {
      return `[${ts()}] [${info.level}] [${info.service}] ${info.message}`;
    }),
  )
});

const logger = createLogger({
  transports: [
    consoleLogs,
    fileLogs,
  ],
});

export default logger;