import * as fs from "fs";
import path from 'path';
import Config from './../config';

const winston = require('winston');
const logDir = path.join(__dirname, './../../logs');

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const tsFormat = () => (new Date()).toLocaleTimeString();

const logger = winston.createLogger({
    transports: [

        // colorize the output to the console
        new (winston.transports.Console)({
            timestamp: tsFormat,
            colorize: true,
            level: 'info',
            handleExceptions: true
        }),

        new (require('winston-daily-rotate-file'))({
            filename: `${logDir}/.log`,
            timestamp: tsFormat,
            datePattern: 'dd-MM-yyyy',
            prepend: true,
            level: Config.isProduction ?  'info': 'verbose',
            handleExceptions: true,
            colorize: false
        }),

        //loggingWinston
    ],
    exitOnError: false
});



logger.info('Success message');
logger.warn('Warning message');
logger.error('Error info');

export default logger;