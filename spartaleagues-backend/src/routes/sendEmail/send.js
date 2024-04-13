import Router from 'express';
import nodemailer from 'nodemailer';

const User = require ('./../../mongoose/models/user');

//Templates
import ContactBody from './templates/contact';
import ResetPassword from './templates/resetPassword';
import TeamInvite from './templates/teamInvite';
import PaymentInvoice from './templates/paymentInvoice';

export default () => {

    let router = Router();

    let interfaceDbModel_User = User;


    // Nodemailer Code
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'Spartaleagues@gmail.com', // generated ethereal user
            pass: 'Friction!123'  // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });


    /* Send Contact */
    let contact = async (req, res, next) => {

        console.log(req.body);

        let { name, email, message } = req.body;
        
        const output = await ContactBody(name, email, message);

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
            
            if(error) {

                console.log(error);

                return res.status(500).json({success: false, msg: 'Some error occured please try again!'});
            } else {

                return res.status(200).json({success: true, msg: 'Your message has been sent successfully!'});
            }
        });
    }



    /* Reset User Password */
    let resetPassword = async (req, res, next) => {
        
        console.log(req.body);

        let email = req.body.email.toLowerCase();
        

        interfaceDbModel_User.findOne({'email': email}, async (err, user) => {

            if(user) {

                let password = user.password.substring(0, 15);
                
                const output = await ResetPassword(email, password);
              
                // setup email data with unicode symbols
                let mailOptions = {
                    from: '"SpartaLeagues" <noreply@spartaleagues.com>', // sender address
                    to: email, // list of receivers
                    subject: 'Please reset your password', // Subject line
                    html: output // html body
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {

                    if(error) {

                        console.log(error);
                        
                        return res.status(500).json({success: false, msg: 'Some error occured please try again!'});
                    } else {

                        return res.status(200).json({success: true, msg: 'Your message has been sent successfully!'});
                    }
                });
            } else {
                res.json({success: false, msg: 'Email does not exist!'});
            }
        });
    };



    /* Send Team Invte */
    let sendTeamInvite = async (req, res, next) => {

        let { name, email, gameRank, steamProfile } = req.body;
        
        let toEmail = req.body.toEmail.toLowerCase();

        let output = await TeamInvite(name, email, gameRank, steamProfile);

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"SpartaLeagues" <noreply@spartaleagues.com>', // sender address
            to: toEmail, // list of receivers
            subject: 'Team Invitation', // Subject line
            html: output // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {

                console.log(error);
                
                return res.status(500).json({success: false, msg: 'Some error occured please try again!'});
            } else {

                return res.status(200).json({success: true, msg: 'Your message has been sent successfully!'});
            }
        });
    }


    /* Send Payment Invoice */
    let paymentInvoice = async (req, res, next) => {

        console.log(req.body);

        let { payment_id, txnId, emails, amount, competetionName } = req.body;


        var maillist = emails;

        console.log("Mail List: ",maillist);

        maillist.toString();

        const output = await PaymentInvoice(payment_id, txnId, amount, competetionName);


        // setup email data with unicode symbols
        let mailOptions = {
            from: '"SpartaLeagues" <noreply@spartaleagues.com>', // sender address
            to: maillist, // list of receivers
            subject: 'Payment Invoice', // Subject line
            html: output // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {

                console.log(error);
                
                return res.status(500).json({success: false, msg: 'Some error occured please try again!'});
            } else {

                return res.status(200).json({success: true, msg: 'Your message has been sent successfully!'});
            }
        });
    }



    return {
        contact: contact,
        resetPassword: resetPassword,
        sendTeamInvite: sendTeamInvite,
        paymentInvoice: paymentInvoice,
    }
}
