import Router from 'express';
import _ from 'lodash';

import { DbMongooseUpload } from './../../mongoose/interface';
const Faq = require('../../mongoose/models/faq');


export default (app) => {

    let router = Router();

    let dbMongooseUpload = DbMongooseUpload(app);


    /**
    * 
    * @param {Request} req 
    * @param {Response} res 
    * @param {*} next 
    */


    /* Add Faqs */
    let add = async (req, res, next) => {

        console.log(req.body);

        // Server Side Validation
        req.checkBody('faqQuestion', 'faqQuestion is Required').isAscii();
        req.checkBody('faqAns', 'faqAns is Required').isAscii();

        var errors = await req.validationErrors();

        if (errors) {
            //console.log(errors);
            errors = _.first(errors);
            let errValidation = {
                code: 400,
                message: errors.msg
            };

            return next(errValidation);
            //res.json({success: false, msg: 'Please fill in all fields!'});
        }

        let { faqQuestion, faqAns } = req.body;

        try {

            let faqModel = new Faq({
                faqQuestion: faqQuestion,
                faqAns: faqAns
            });
    
            console.log("Faq Model: ", faqModel);


            Faq.findOne({'faqQuestion': faqModel.faqQuestion}, async (err, faq) => {


                if (err) return res.json({success: false, msg: err});
                
                if(faq) {
                    return res.json({success: false, msg: 'Faq question Already Exist!'});
                } 

                let oFaq = await dbMongooseUpload.add(faqModel);

                if(oFaq) {
                    return res.status(200).json({success: true, data: oFaq, msg: 'Faq Question Added Successfully!'});
                } else {
                    return res.status(500).json({success: false, msg: 'Something went wrong please try again'});
                }

            });


        } catch (e) {
            next(e);
        }
            
    };



    /* Get All Faqs */
    let getFaqs = async (req, res, next) => {

        Faq.find({}).exec(function(err, faqs) {
            if(err) {
                return res.json({success: false, msg: err});
            } else {
                return res.status(200).json(faqs);
            }
        });
    }



    return {
        addFaqs: add,
        getFaqs: getFaqs
    }
}
