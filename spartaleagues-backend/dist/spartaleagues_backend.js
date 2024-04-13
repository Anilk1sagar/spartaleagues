'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _logger = require('./utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _configBase = require('./initials/configBase');

var _configBase2 = _interopRequireDefault(_configBase);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _dotenvSafe = require('dotenv-safe');

var _dotenvSafe2 = _interopRequireDefault(_dotenvSafe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Environment Directory
console.log(_path2.default.join(__dirname, '.env'));

let result = {};

if (_config2.default.isProduction()) {
    result = _dotenv2.default.config({ path: '.env.production' });
    console.log("Node Environment is running on:", process.env.NODE_ENV, "Mode");
} else {
    result = _dotenv2.default.config({ path: '.env' });
    console.log("Node Environment is running on:", process.env.NODE_ENV, "Mode");
}

_dotenvSafe2.default.load({ allowEmptyValues: true });
console.log(result.parsed);

// ====================== Server Configurations =====================//
console.log(process.env.API_PORT);

let server = {};

// Start Server

_configBase2.default.configure().then(app => {
    //console.log(app);
    server = _http2.default.createServer(app);

    server.listen(_config2.default.apiPort(), function () {
        console.log("Listening on ", _config2.default.apiPort());
    });
}).catch(error => {
    __logErrorAndExit("unable to start", error);
});

// Logger Error Function
function __logErrorAndExit(message, err) {
    console.log("message|| ", message);
    console.log("error|| ", err);
    _logger2.default.debug(" error __logErrorAndExit {}", err);
    setTimeout(function () {
        process.exit();
    }, 3000);
}
//# sourceMappingURL=spartaleagues_backend.js.map