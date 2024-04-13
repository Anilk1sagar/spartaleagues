'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _database = require('./../configDb/database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Queries a Baz for items.
 * @param {Express} app Subgroup id to query.
 */

exports.default = app => {

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

        if (!token) return res.status(403).send({ success: false, message: 'No token provided.' });

        _jsonwebtoken2.default.verify(token, _database2.default.secret, function (err, decoded) {

            if (err) {
                return res.status(500).send({ success: false, message: 'Failed to authenticate token.' });
            }

            console.log("Decoded :", decoded);

            // if everything good, save to request for use in other routes
            req.userId = decoded._id;

            next();
        });
    };

    return {
        verifyUser: verify
    };
}; //Authorization
//# sourceMappingURL=verifyUser.js.map