'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('./../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const winston = require('winston');
const logDir = _path2.default.join(__dirname, './../../logs');

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const tsFormat = () => new Date().toLocaleTimeString();

const logger = winston.createLogger({
    transports: [

    // colorize the output to the console
    new winston.transports.Console({
        timestamp: tsFormat,
        colorize: true,
        level: 'info',
        handleExceptions: true
    }), new (require('winston-daily-rotate-file'))({
        filename: `${logDir}/.log`,
        timestamp: tsFormat,
        datePattern: 'dd-MM-yyyy',
        prepend: true,
        level: _config2.default.isProduction ? 'info' : 'verbose',
        handleExceptions: true,
        colorize: false
    })],
    exitOnError: false
});

logger.info('Success message');
logger.warn('Warning message');
logger.error('Error info');

exports.default = logger;
//# sourceMappingURL=logger.js.map