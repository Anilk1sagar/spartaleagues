'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _contact = require('./templates/contact');

var _contact2 = _interopRequireDefault(_contact);

var _resetPassword = require('./templates/resetPassword');

var _resetPassword2 = _interopRequireDefault(_resetPassword);

var _teamInvite = require('./templates/teamInvite');

var _teamInvite2 = _interopRequireDefault(_teamInvite);

var _paymentInvoice = require('./templates/paymentInvoice');

var _paymentInvoice2 = _interopRequireDefault(_paymentInvoice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const User = require('./../../mongoose/models/user');

//Templates

exports.default = () => {

    let router = (0, _express2.default)();

    let interfaceDbModel_User = User;

    // Nodemailer Code
    // create reusable transporter object using the default SMTP transport
    let transporter = _nodemailer2.default.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'Spartaleagues@gmail.com', // generated ethereal user
            pass: 'Friction!123' // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    /* Send Contact */
    let contact = async (req, res, next) => {

        console.log(req.body);

        let { name, email, message } = req.body;

        const output = await (0, _contact2.default)(name, email, message);

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"SpartaLeagues Contact" <contact@esparta.com>', // sender address
            to: 'Spartaleagues@gmail.com', // list of receivers
            subject: 'Spartaleagues Contact Request', // Subject line
            //text: 'Hello world?', // plain text body
            html: output // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {

            if (error) {

                console.log(error);

                return res.status(500).json({ success: false, msg: 'Some error occured please try again!' });
            } else {

                return res.status(200).json({ success: true, msg: 'Your message has been sent successfully!' });
            }
        });
    };

    /* Reset User Password */
    let resetPassword = async (req, res, next) => {

        console.log(req.body);

        let email = req.body.email.toLowerCase();

        interfaceDbModel_User.findOne({ 'email': email }, async (err, user) => {

            if (user) {

                let password = user.password.substring(0, 15);

                const output = await (0, _resetPassword2.default)(email, password);

                // setup email data with unicode symbols
                let mailOptions = {
                    from: '"SpartaLeagues" <noreply@spartaleagues.com>', // sender address
                    to: email, // list of receivers
                    subject: 'Please reset your password', // Subject line
                    html: output // html body
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {

                    if (error) {

                        console.log(error);

                        return res.status(500).json({ success: false, msg: 'Some error occured please try again!' });
                    } else {

                        return res.status(200).json({ success: true, msg: 'Your message has been sent successfully!' });
                    }
                });
            } else {
                res.json({ success: false, msg: 'Email does not exist!' });
            }
        });
    };

    /* Send Team Invte */
    let sendTeamInvite = async (req, res, next) => {

        let { name, email, gameRank, steamProfile } = req.body;

        let toEmail = req.body.toEmail.toLowerCase();

        let output = await (0, _teamInvite2.default)(name, email, gameRank, steamProfile);

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"SpartaLeagues" <noreply@spartaleagues.com>', // sender address
            to: toEmail, // list of receivers
            subject: 'Team Invitation', // Subject line
            html: output // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {

                console.log(error);

                return res.status(500).json({ success: false, msg: 'Some error occured please try again!' });
            } else {

                return res.status(200).json({ success: true, msg: 'Your message has been sent successfully!' });
            }
        });
    };

    /* Send Payment Invoice */
    let paymentInvoice = async (req, res, next) => {

        console.log(req.body);

        let { payment_id, txnId, emails, amount, competetionName } = req.body;

        var maillist = emails;

        console.log("Mail List: ", maillist);

        maillist.toString();

        const output = await (0, _paymentInvoice2.default)(payment_id, txnId, amount, competetionName);

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"SpartaLeagues" <noreply@spartaleagues.com>', // sender address
            to: maillist, // list of receivers
            subject: 'Payment Invoice', // Subject line
            html: output // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {

                console.log(error);

                return res.status(500).json({ success: false, msg: 'Some error occured please try again!' });
            } else {

                return res.status(200).json({ success: true, msg: 'Your message has been sent successfully!' });
            }
        });
    };

    return {
        contact: contact,
        resetPassword: resetPassword,
        sendTeamInvite: sendTeamInvite,
        paymentInvoice: paymentInvoice
    };
};
//# sourceMappingURL=send.js.map