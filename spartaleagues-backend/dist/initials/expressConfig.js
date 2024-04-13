'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _routerConfig = require('./routerConfig');

var _routerConfig2 = _interopRequireDefault(_routerConfig);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _expressBoom = require('express-boom');

var _expressBoom2 = _interopRequireDefault(_expressBoom);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

    configure: async app => {

        /* =================== Middlewares ======================= */
        app.use((0, _cors2.default)());

        // Express Validator Middleware
        app.use((0, _expressValidator2.default)({
            errorFormatter: (param, msg, value) => {
                const namespace = param.split('.'),
                      root = namespace.shift(),
                      formParam = root;

                while (namespace.length) {
                    formParam += '[' + namespace.shift() + ']';
                }
                return {
                    param: formParam,
                    msg: msg,
                    value: value
                };
            }
        }));

        //Morgan
        app.use((0, _morgan2.default)('dev'));

        // Body Parser Middleware
        app.use(_bodyParser2.default.json());
        app.use(_bodyParser2.default.urlencoded({ extended: true }));

        // Passport Middleware
        app.use(_passport2.default.initialize());
        app.use(_passport2.default.session());
        require('../middleware/passportVerifyUser')(_passport2.default);

        /* =================== Middlewares Ends ======================= */

        app.use((0, _expressBoom2.default)());
        global.util = _util2.default;

        /* Set Static Folder */
        app.use(_express2.default.static(_path2.default.join(__dirname, './../public')));

        //Router Config
        app = _routerConfig2.default.initRoutes(app);

        return app;
    }

};
//# sourceMappingURL=expressConfig.js.map