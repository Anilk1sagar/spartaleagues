'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _interface = require('./../../mongoose/interface');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Competetion = require('../../mongoose/models/competetion');

exports.default = app => {

    let router = (0, _express2.default)();
    let dbMongooseUpload = (0, _interface.DbMongooseUpload)(app);

    /**
    * 
    * @param {Request} req 
    * @param {Response} res 
    * @param {*} next 
    */

    /* Add Competetion */
    let add = async (req, res, next) => {

        req.checkBody('competetionName', 'competetionName is Required').isAscii();
        req.checkBody('competetionGameName', 'competetionGameName is Required').isAscii();
        req.checkBody('competetionLocation', 'competetionLocation is Required').isAscii();
        req.checkBody('competetionDate', 'competetionDate is Required').isAscii();

        var errors = req.validationErrors();

        if (errors) {
            errors = _lodash2.default.first(errors);
            let errValidation = {
                code: 400,
                message: errors.msg
            };
            return next(errValidation);
        }

        let { competetionName, competetionDescription, competetionGameName, competetionLocation, competetionEntryFees, competetionDate, isDone } = req.body;

        try {

            let newCompetetion = new Competetion({
                name: competetionName,
                description: competetionDescription,
                gameName: competetionGameName,
                location: competetionLocation,
                entryFees: competetionEntryFees,
                date: competetionDate,
                isDone: isDone
            });

            console.log(newCompetetion);

            // Check post if already Exist
            Competetion.findOne({ 'name': newCompetetion.name }, async (err, competetion) => {

                if (err) return res.json({ success: false, msg: err });

                if (competetion) {
                    return res.json({ success: false, msg: 'Competetion Already Exist!' });
                }

                let oCompetetion = await dbMongooseUpload.add(newCompetetion);

                if (oCompetetion) {

                    return res.status(200).json({ success: true, data: oCompetetion, msg: 'Competetion Added Successfully!' });
                } else {

                    return res.status(500).json({ success: false, msg: 'Something went wrong please try again' });
                }
            });
        } catch (e) {
            next(e);
        }
    };

    /* Get Competetion */
    let getCompetetions = (req, res, next) => {

        Competetion.find({ 'isDone': false }, function (err, competetion) {
            if (err) {
                return res.json({ success: false, msg: err });
            } else {
                //console.log(competetion);
                return res.status(200).json(competetion);
            }
        });
    };

    return {
        add: add,
        getCompetetions: getCompetetions
    };
};
//# sourceMappingURL=competetions.js.map