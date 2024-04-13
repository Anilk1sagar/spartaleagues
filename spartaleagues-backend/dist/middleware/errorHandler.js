'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = errorHandler;

var _config = require('./../config');

var _config2 = _interopRequireDefault(_config);

var _logger = require('./../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function errorHandler(err, req, res, next) {

    _logger2.default.info("*********************** errorHandler started **********************");

    console.log("working error");
    if (!err) {
        return res.sendStatus(500);
    }

    const error = {
        message: err.message || 'Internal Server Error.'
    };

    if (_config2.default.isProduction()) {
        error.stack = {};
    } else {
        error.stack = err.stack;
    }

    // if (process.env.RUN_MODE==='dev') {
    //   error.stack = err.stack;
    // }

    if (err.errors) {

        error.errors = {};

        const { errors } = err;

        for (const type in errors) {
            if (type in errors) {
                error.errors[type] = errors[type].message;
            }
        }
    }

    console.log(err);
    //log.info("dede");
    //res.status(err.status || 500).json(error);
    _logger2.default.debug(" error middleware {}", err);
    res.status(err.code || 500).json(error);
}
//# sourceMappingURL=errorHandler.js.map