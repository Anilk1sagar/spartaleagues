import * as express from "express";
import Routes from './../routes';
import Express from "express";
import path from 'path';


export default {
    /**
     * Queries a Baz for items.
     * @param {Express} app 
     *     or itemId, or null to search everything.
     */
    initRoutes: (app) => {
        
        let routes = Routes(app);

        console.log("_initRoutes");

        /* Main Routes */
        app.use('/api', routes);


        // Index Routes
        app.get('/', (req, res) => {
            res.send('Invalid Endpoint');
        });


        // All Other Routes
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, './../public/index.html'));
        });

        return app;

    }

   
}