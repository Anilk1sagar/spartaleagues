import express from 'express';
import RouterConfig from './routerConfig';
import path from 'path';
import cors from 'cors';
import util from 'util';
import morgan from 'morgan';
import Boom from 'express-boom';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';
import passport from 'passport';


export default {

    configure: async (app) => {


        /* =================== Middlewares ======================= */
            app.use(cors());

            // Express Validator Middleware
            app.use(expressValidator({
                errorFormatter: (param, msg, value) => {
                    const namespace =param.split('.')
                    , root = namespace.shift()
                    , formParam = root;

                    while(namespace.length) {
                        formParam += '[' + namespace.shift() + ']';
                    }
                    return {
                        param : formParam,
                        msg   : msg,
                        value : value
                    };
                }
            }));


            //Morgan
            app.use(morgan('dev'));
            
            // Body Parser Middleware
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({extended: true}));


            // Passport Middleware
            app.use(passport.initialize());
            app.use(passport.session());
            require('../middleware/passportVerifyUser')(passport);

        /* =================== Middlewares Ends ======================= */



        app.use(Boom());
        global.util = util;

        /* Set Static Folder */
        app.use(express.static(path.join(__dirname, './../public')));
        

        //Router Config
        app = RouterConfig.initRoutes(app);


        return app;
    }

}