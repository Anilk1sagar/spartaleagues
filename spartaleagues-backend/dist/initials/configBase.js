"use strict";

Object.defineProperty(exports, "__esModule", {
        value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _expressConfig = require("./expressConfig");

var _expressConfig2 = _interopRequireDefault(_expressConfig);

var _expressLogConfig = require("./expressLogConfig");

var _expressLogConfig2 = _interopRequireDefault(_expressLogConfig);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require("./../config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

        configure: async () => {

                //========================= DATABASE CONNECTION START ========================//
                let database = _config2.default.getMongooseDBUrl();

                console.log("Database URL: ", database);

                // Connect To Database
                _mongoose2.default.connect(database);

                // On Connection
                _mongoose2.default.connection.on('connected', () => {
                        console.log('Connected to database ' + database);
                });

                // Database Connection Error
                _mongoose2.default.connection.on('error', err => {
                        console.log('Database error: ' + err);
                });

                //========================= DATABASE CONNECTION ENDS ========================//


                /* Initialize App */
                let app = (0, _express2.default)();

                app = await _expressConfig2.default.configure(app);

                app = _expressLogConfig2.default.configure(app);

                return app;
        }
};
//import ConfigDb from './../configDb/database';
//# sourceMappingURL=configBase.js.map