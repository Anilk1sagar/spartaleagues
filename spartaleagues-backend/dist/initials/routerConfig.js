"use strict";

Object.defineProperty(exports, "__esModule", {
        value: true
});

var _express = require("express");

var express = _interopRequireWildcard(_express);

var _routes = require("./../routes");

var _routes2 = _interopRequireDefault(_routes);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
        /**
         * Queries a Baz for items.
         * @param {Express} app 
         *     or itemId, or null to search everything.
         */
        initRoutes: app => {

                let routes = (0, _routes2.default)(app);

                console.log("_initRoutes");

                /* Main Routes */
                app.use('/api', routes);

                // Index Routes
                app.get('/', (req, res) => {
                        res.send('Invalid Endpoint');
                });

                // All Other Routes
                app.get('*', (req, res) => {
                        res.sendFile(_path2.default.join(__dirname, './../public/index.html'));
                });

                return app;
        }

};
//# sourceMappingURL=routerConfig.js.map