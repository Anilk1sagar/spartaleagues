'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jsSha = require('js-sha512');

var _jsSha2 = _interopRequireDefault(_jsSha);

var _interface = require('./../../mongoose/interface');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ParticipantUser = require('../../mongoose/models/participantsUser');

exports.default = app => {

    let router = (0, _express2.default)();
    let dbMongooseUser = (0, _interface.DbMongooseUser)(app);

    /* Create has for payment */
    let createHash = async (req, res, next) => {

        //Test Salt = eCwWELxi
        //Prod Salt = tg7QDUiyCl

        let { preHashString } = req.body;

        try {

            const salt = 'eCwWELxi';
            const hash = (0, _jsSha2.default)(preHashString + salt);
            console.log("Hash: " + hash);

            return res.status(200).json({ success: true, hash: hash });
        } catch (e) {
            next(e);
        }
    };

    /* Payment Status */
    let paymentStatus = async (req, res, next) => {

        //Test = res.redirect('http://localhost:4200/payment-status/'+req.body.status+'/'+req.body.payuMoneyId+'/'+req.body.txnid);

        //Prod = res.redirect('https://www.spartaleagues.com/payment-status/'+req.body.status+'/'+req.body.payuMoneyId+'/'+req.body.txnid);

        console.log(req.body);

        let { status, payuMoneyId, txnid } = req.body;

        try {

            if (status == 'success') {

                return res.redirect('http://localhost:4200/payment-status/' + status + '/' + payuMoneyId + '/' + txnid);
            } else {

                return res.redirect('http://localhost:4200/payment-status/' + status + '/' + payuMoneyId + '/' + txnid);
            }
        } catch (e) {
            next(e);
        }
    };

    /* Check Team Name Availability */
    let checkTeamName = async (req, res, next) => {

        let { teamName } = req.body;

        try {

            // Check Email If Exist
            ParticipantUser.findOne({ 'teamName': teamName }, (err, user) => {

                if (err) return res.json({ success: false, msg: err });

                if (user) {
                    return res.json({ success: false, msg: 'Team Name Already Exist!' });
                } else {
                    return res.status(200).json({ success: true, msg: 'Team Name Available!' });
                }
            });
        } catch (e) {
            next(e);
        }
    };

    /* Add Participant Usser */
    let addUser = async (req, res, next) => {

        let { mode, competetionName, competetionDate, gameName, payment_id, txnId, teamName, contact, emails } = req.body;

        try {

            let userModel = new ParticipantUser({
                mode: mode,
                competetionName: competetionName,
                competetionDate: competetionDate,
                gameName: gameName,
                payment_id: payment_id,
                txnId: txnId,
                teamName: teamName,
                contact: contact,
                emails: emails
            });

            console.log(userModel);

            // Calling addPost Function to store Post in Database
            ParticipantUser.findOne({ 'teamName': userModel.teamName }, async (err, user) => {

                if (err) return res.json({ success: false, msg: err });

                if (user) {
                    return res.json({ success: false, msg: 'User Already Added!' });
                }

                // Add User ()
                let oUser = await dbMongooseUser.addUser(userModel);

                //console.log(oUser);

                if (oUser) {
                    return res.status(200).json({ success: true, data: oUser, msg: 'Payment done successfully! & status updated!' });
                } else {
                    return res.status(500).json({ success: false, msg: 'Something went wrong please try again' });
                }
            });
        } catch (e) {
            next(e);
        }
    };

    return {
        createHash: createHash,
        paymentStatus: paymentStatus,
        checkTeamName: checkTeamName,
        addUser: addUser
    };
};
//# sourceMappingURL=payments.js.map