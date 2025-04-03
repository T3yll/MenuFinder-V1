import { createLogger, format, transports } from 'winston';

// custom log display format
const customFormat = format.printf(({ timestamp, level, stack, message }) => {
  return `${timestamp} - ${level}: ${message || stack}`;
});

const options = {
  errorFile: {
    filename: 'logger/logs/error.log',
    level: 'error',
  },
  combineFile: {
    filename: 'logger/logs/combine.log',
    level: 'info',
  },
  console: {
    level: 'silly',
  },
};

// for development environment
const devLogger = {
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    format.colorize({ all: true }),
    format.align(),
    format.errors({ stack: true }),
    customFormat
  ),
  transports: [new transports.Console(options.console)],
};

// for production environment
const prodLogger = {
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    new transports.File(options.errorFile),
    new transports.File(options.combineFile),
  ],
};

// export log instance based on the current environment
const instanceLogger = process.env.ENV === 'prod' ? prodLogger : devLogger;

export const instance = createLogger(instanceLogger);
