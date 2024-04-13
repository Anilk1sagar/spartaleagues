import _ from 'lodash';
import Express from 'express';
import Router from 'express';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

import { DbMongooseUser } from './../../mongoose/interface';
import config from '../../configDb/database';

//Models
const User = require('./../../mongoose/models/user');
const ParticipantUser = require('./../../mongoose/models/participantsUser');


export default (app) => {

    let dbMongooseUser = DbMongooseUser(app);

    let router = Router();



    /**
   * 
   * @param {Request} req 
   * @param {Response} res 
   * @param {*} next 
   */
    /* Register User */
    let register = async (req, res, next) => {

        // Server Side Validation
        req.checkBody('name', 'Name is Required').isAscii();
        req.checkBody('username', 'Username is Required').isAscii();
        req.checkBody('email', 'Email is Required').isAscii();
        req.checkBody('password', 'Password is Required').isAscii();

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

        let { name, username, email, password } = req.body;

        try {

            let userModel = new User({
                name: name,
                username: username.toLowerCase(),
                email: email.toLowerCase(),
                password: password
            });
    
            console.log("User Model: ", userModel);


            /* Check Username */
            let oUser = await dbMongooseUser.getUserByUsername(userModel.username);

            if(oUser) {
                return res.json({success: false, msg: 'Username Already Exist!'});
            }

            /* Check Email */
            oUser = await dbMongooseUser.getUserByEmail(userModel.email);

            if(oUser) {
                return res.json({success: false, msg: 'Email Already Exist!'});
            }


            // Add User ()
            let user = await dbMongooseUser.addUser(userModel);

            //console.log(user);

            if(user) {
                return res.status(200).json({success: true, msg: 'User Registered Successfully!'});
            } else {
                return res.status(500).json({success: false, msg: 'Something went wrong please try again'});
            }


        } catch (e) {
            next(e);
        }
            
    };



    /* Authenticate User */
    let authenticate = async (req, res, next) => {

        console.log(req.body);

        // Server Side Validation
        req.checkBody('email', 'Email is Required').isAscii();
        req.checkBody('password', 'Password is Required').isAscii();

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

        let { email, password } = req.body;

        email = email.toLowerCase();

        try {

            //Check User Email
            let user = await dbMongooseUser.getUserByEmail(email);

            if(user) {

                let isMatch = await dbMongooseUser.comparePassword(password, user.password);

                if(isMatch) {
                    
                    const token = jwt.sign(user.toJSON(), config.secret, {
                        expiresIn: 604800 // 1 Week
                    });

                    return res.status(200).json({
                        success: true,
                        token: 'JWT '+token,
                        user: {
                            id: user._id,
                            name: user.name,
                            username: user.username,
                            city: user.city,
                            phone: user.phone,
                            gameRank: user.gameRank,
                            steamProfile: user.steamProfile,
                            imgLink: user.imgLink,
                            coverImgLink: user.coverImgLink,
                            email: user.email
                        }
                    });

                } else {

                    return res.status(200).json({success: false, msg: 'Wrong Password'});
                }
            } else {

                return res.status(404).json({success: false, msg: 'User Not Found!'});
            }

        } catch (e) {
            next(e);
        }
    };



    /* Update User Password */
    let update_password = async (req, res, next) => {

        let { email } = req.body;

        try {

            let userModel = {};

            if(req.body.password) {
                userModel.password = req.body.password
            }

            let user = await dbMongooseUser.getUserByEmail(email);

            if(user) {

                let oUser = await dbMongooseUser.updateUser(userModel, user._id);

                if(oUser) {

                    return res.status(200).json({success: true, msg: 'Password Updated Successfully!'});
                } else {

                    return res.status(500).json({success: false, msg: 'Something went wrong please try again'});
                }

            } else {
               return res.status(404).json({success: false, msg: 'User Not Found!'});
            }

        } catch (e) {
            next(e);
        }

    };



    /* Get User Profile */
    let profile = async (req, res, next) => {

        try {

            let user = await dbMongooseUser.getUserById(req.user._id);

            //console.log("From Proilfe: ", user);

            if(user) {

                return res.status(200).json(user);

            } else {
                return res.status(404).json({success: false, msg: 'User Not Found!'});
            }

        } catch (e) {
            next(e);
        }

    };



    /* Get Public User Profile */
    let publicUserProfile = async (req, res, next) => {

        let { username } = req.params;
        username = username.toLowerCase();

        try {

            let user = await dbMongooseUser.getUserByUsername(username);

            if(user) {

                return res.status(200).json(user);
            } else {

                return res.status(200).json({success: false, msg: 'No User Found!'});
            }

        } catch (e) {
            next(e);
        }

    };


    /* Update User */
    let updateUser = async (req, res, next) => {

        let { id } = req.params;

        let { name, username, city, phone, gameRank, steamProfile, imgLink, coverImgLink, email, password } = req.body;

        try {

            let user = await dbMongooseUser.getUserById(id);

            if(!user) { 
                return res.status(200).json({success: false, msg: 'No User Found!'});
            }

            let userModel = {
                name: name,
                username: username,
                city: city,
                phone: phone,
                gameRank: gameRank,
                steamProfile: steamProfile,
                imgLink: imgLink,
                coverImgLink: coverImgLink,
                email: email,
                password: password
            }
            
            //Check Email if Exist
            let oUser = await dbMongooseUser.getUserByEmail(userModel.email);

            if(oUser) {
                return res.status(200).json({success: false, msg: 'Email Already Exist!'}); 
            }

            //Check Username if Exist
            oUser = await dbMongooseUser.getUserByUsername(userModel.username);

            if(oUser) {
                return res.status(200).json({success: false, msg: 'Username Already Exist!'});
            }

            console.log("User=>>>>>>>>>>>", oUser);

            //Update User
            let ouser = await dbMongooseUser.updateUser(userModel, id);

            if(ouser) {

                return res.status(200).json({success: true, msg: 'User Updated Successfully!'});
            } else {

                return res.status(500).json({success: false, msg: 'Something went wrong please try again'});
            }
  

        } catch(e) {
            next(e);
        }

    };



    /* Search Users */
    let searchUsers = async (req, res, next) => {

        let gameRank = req.body.search;

        console.log(gameRank);

        try {
            
            let user = await dbMongooseUser.searchUser(gameRank);

            if(user) {
                return res.status(200).json(user);

            } else {
                return res.status(404).json({success: false, msg: 'Users Not Found!'});
            }

        } catch (e) {
            next(e);
        }

    };



    /* Get Participant User status data */
    let getParticipantUser = async (req, res, next) => {

        let { email } = req.params;
        email = email.toLowerCase();

        console.log(email);


        try {
            
            let user = await dbMongooseUser.getParticipantUser(email);

            if(user) {
                return res.status(200).json(user);

            } else {
                return res.status(404).json({success: false, msg: 'User Not Found!'});
            }

        } catch (e) {
            next(e);
        }

    }


    /* Get Teams */
    let getTeams = async (req, res, next) => {

        try {

            ParticipantUser.find({}, (err, user) => {

                if (err) return res.status(500).send("There was a problem finding the Teams.");

                if(user) {

                    return res.status(200).json(user);
                } 
                else {

                    return res.status(404).json({success: false, msg: 'Teams Not Found!'});
                }
            });

        } catch (e) {
            next(e);
        }
    }



    return {
        register: register,
        authenticate: authenticate,
        update_password: update_password,
        profile: profile,
        publicUserProfile: publicUserProfile,
        updateUser: updateUser,
        searchUsers: searchUsers,
        getParticipantUser: getParticipantUser,
        getTeams: getTeams
    }

}