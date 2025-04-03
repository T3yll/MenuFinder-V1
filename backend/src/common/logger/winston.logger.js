"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = void 0;
const winston_1 = require("winston");
const customFormat = winston_1.format.printf(({ timestamp, level, stack, message }) => {
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
const devLogger = {
    format: winston_1.format.combine(winston_1.format.timestamp({
        format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }), winston_1.format.colorize({ all: true }), winston_1.format.align(), winston_1.format.errors({ stack: true }), customFormat),
    transports: [new winston_1.transports.Console(options.console)],
};
const prodLogger = {
    format: winston_1.format.combine(winston_1.format.timestamp({
        format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }), winston_1.format.errors({ stack: true }), winston_1.format.json()),
    transports: [
        new winston_1.transports.File(options.errorFile),
        new winston_1.transports.File(options.combineFile),
    ],
};
const instanceLogger = process.env.ENV === 'prod' ? prodLogger : devLogger;
exports.instance = (0, winston_1.createLogger)(instanceLogger);
//# sourceMappingURL=winston.logger.js.map