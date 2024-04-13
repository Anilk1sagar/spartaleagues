import express from 'express';
import  ExpressConfig from "./expressConfig";
import  ExpressLogConfig from "./expressLogConfig";

import mongoose from 'mongoose';
//import ConfigDb from './../configDb/database';
import Config from './../config';

export default {

    configure: async ()=> {

        //========================= DATABASE CONNECTION START ========================//
            let database = Config.getMongooseDBUrl();

            console.log("Database URL: ",database);

            // Connect To Database
            mongoose.connect(database);

            // On Connection
            mongoose.connection.on('connected', () => {
                console.log('Connected to database ' + database);
            });

            // Database Connection Error
            mongoose.connection.on('error', (err) => {
                console.log('Database error: ' + err);
            });

        //========================= DATABASE CONNECTION ENDS ========================//


        /* Initialize App */
        let app = express();

        app = await ExpressConfig.configure(app);

        app= ExpressLogConfig.configure(app);

        return app;
    }
}