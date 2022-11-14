import moment from "moment";
import { createLogger, format, transports } from "winston";
const { printf, combine, colorize } = format;


const formatLog = () => {
  return printf(info => `[${moment().format("YYYY-MM-DD HH:mm:ss.SSS")}] [${info.level}] [${info.name || ""}] ${info.message}`);
}

const consoleLogs = new transports.Console({
  level: "debug",
  format: combine(
    colorize({ all: true }),
    formatLog(),
  ),
});

const fileLogs = new transports.File({
  level: "info",
  filename: "logs/api.log",
  format: combine(
    formatLog(),
  )
});

const logger = createLogger({
  transports: [
    consoleLogs,
    fileLogs,
  ],
});

export default logger;