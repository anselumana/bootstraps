import { createLogger, format, transports } from "winston";

const { combine, timestamp, label, prettyPrint, printf } = format;

const custom = printf(({ level, message, label, service, timestamp }) => {
  return `[${timestamp}] [${service}] ${message}`;
});

const _transports = [
  new transports.Console(),
];

const _format = format.combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss"}),
  format.colorize({ all: true }),
  custom,
  // format.timestamp({ format: "YYYY-MM-DD HH:mm:ss"}),
  // format.json(),
  // format.prettyPrint(),
  // format.errors({ stack: true }),
  // format.json(),
  // format.splat(),
);

const logger = createLogger({
  level: "debug",
  format: _format,
  defaultMeta: { service: "products-api" },
  transports: _transports,
});

export default logger;