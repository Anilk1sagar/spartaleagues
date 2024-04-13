//Authorization
import _ from 'lodash';

import Express from 'express';
import { Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import config  from './../configDb/database';

/**
 * Queries a Baz for items.
 * @param {Express} app Subgroup id to query.
 */

export default (app) => {
    
    /**
     * Express middleware function
     * @param {Request} req 
     * @param {Response} res 
     * @param {function} next 
     */

    
    let verify = async (req, res, next) => {

        console.log("Request Headers: ", req.headers);

        var token = req.headers['authorization'];

        console.log("Token: ", token);

        if (!token)
        return res.status(403).send({ success: false, message: 'No token provided.' });

        jwt.verify(token, config.secret, function(err, decoded) {

            if (err) {
                return res.status(500).send({ success: false, message: 'Failed to authenticate token.' });
            }

            console.log("Decoded :", decoded);

            // if everything good, save to request for use in other routes
            req.userId = decoded._id;

            next();
        });

    }

    return {
        verifyUser: verify
    }

}