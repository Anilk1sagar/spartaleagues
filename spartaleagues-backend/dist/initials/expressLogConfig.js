'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _logger = require('./../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const expressWinston = require('express-winston');

exports.default = {

    /**
     * Queries a Baz for items.
     * @param {Express} app Subgroup id to query.
     */

    configure: app => {

        app.use(expressWinston.logger({
            winstonInstance: _logger2.default
        }));

        return app;
    }
};
//# sourceMappingURL=expressLogConfig.js.map