import http from "http";
import path from 'path';
import logger from './utils/logger';

import ConfigBase from './initials/configBase';
import Config from './config';

import dotenv from "dotenv";
import dotenvSafe from "dotenv-safe";


//Environment Directory
console.log(path.join(__dirname, '.env'));

let result = {};

if(Config.isProduction()) {
    result = dotenv.config({path: '.env.production'});
    console.log("Node Environment is running on:", process.env.NODE_ENV, "Mode");
} else {
    result = dotenv.config({path: '.env'});
    console.log("Node Environment is running on:", process.env.NODE_ENV, "Mode");
}

dotenvSafe.load({allowEmptyValues: true});
console.log(result.parsed);



// ====================== Server Configurations =====================//
console.log(process.env.API_PORT);

let server = {};

// Start Server

ConfigBase.configure().then((app) => {
    //console.log(app);
    server = http.createServer(app);

    server.listen(Config.apiPort(), function () {
        console.log("Listening on ", Config.apiPort());
    });
}).catch((error) => {
    __logErrorAndExit("unable to start", error);
});









// Logger Error Function
function __logErrorAndExit(message, err) {
    console.log("message|| ", message);
    console.log("error|| ", err);
    logger.debug(" error __logErrorAndExit {}", err);
    setTimeout(function () {
        process.exit();
    }, 3000);
}