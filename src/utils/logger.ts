import { createLogger, format, transports } from "winston";

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

const createlogger = createLogger({
  level: process.env.LOG_LEVEL || "trace",
  levels: logLevels,
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json({ deterministic: false })
  ),
  transports: [new transports.Console()],
});

export const logger = (context: Record<string, any>) => {
  return createlogger.child(context);
};
