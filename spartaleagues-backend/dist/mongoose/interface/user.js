'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logger = require('./../../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _user = require('./../../mongoose/models/user');

var _user2 = _interopRequireDefault(_user);

var _participantsUser = require('./../../mongoose/models/participantsUser');

var _participantsUser2 = _interopRequireDefault(_participantsUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Queries a Baz for items.
 * @param {Express} app Subgroup id to query.
 * @param {MongooseDb} mongooseDb ,
 *     or itemId, or null to search everything.
 */

// const User = require('./../../mongoose/models/user');
// const ParticipantUser = require('./../../mongoose/models/participantsUser');

exports.default = app => {

    let interfaceDbModel_User = _user2.default;
    let interfaceDbModel_Puser = _participantsUser2.default;

    /**
     * 
     * @param {string} id 
     */
    let getUserById = async id => {

        let promise = new Promise((resolve, reject) => {

            console.log("Interface-Get User By Id: ", id);

            try {

                interfaceDbModel_User.findById(id, { password: 0 }, (err, user) => {

                    if (err) throw err;

                    if (user) {
                        resolve(user);
                        //resolve(_.pick(user, ['_id', 'name', 'email', 'imgLink']));
                    } else {
                        resolve(null);
                    }
                });
            } catch (err) {

                _logger2.default.error("error in UserCtrl.getById {}", err);
                throw err;
            }
        });

        let callback = await promise;
        console.log("callback Get User By Id: ", callback);
        return callback;
    };

    /**
     * 
     * @param {string} pUsername 
     */
    /* Get User By Email */
    let getUserByUsername = async pUsername => {

        let promise = new Promise((resolve, reject) => {

            try {

                console.log("Interface: ", pUsername);

                interfaceDbModel_User.findOne({ 'username': pUsername }, { password: 0 }, (err, user) => {

                    if (err) throw err;

                    if (user) {
                        resolve(user);
                        //resolve(_.pick(user, ['_id', 'name', 'email', 'imgLink']));
                    } else {
                        resolve(null);
                    }
                });
            } catch (err) {

                _logger2.default.error("error in UserCtrl.getUserByUsername {}", err);
                throw err;
            }
        });

        let callback = await promise;
        console.log("callback Search User By Username: ", callback);
        return callback;
    };

    /**
     * 
     * @param {string} pEmail 
     */
    /* Get User By Email */
    let getUserByEmail = async pEmail => {

        let promise = new Promise((resolve, reject) => {

            try {

                console.log("Interface: ", pEmail);

                interfaceDbModel_User.findOne({ 'email': pEmail }, (err, user) => {

                    console.log(user);

                    if (err) throw err;

                    if (user) {
                        resolve(user);
                        //resolve(_.pick(user, ['_id', 'name', 'email', 'imgLink']));
                    } else {
                        resolve(null);
                    }
                });
            } catch (err) {

                _logger2.default.error("error in UserCtrl.getUserByEmail {}", err);
                throw err;
            }
        });

        let callback = await promise;
        console.log("callback Search User By Email: ", callback);
        return callback;
    };

    /**
     * 
     * @param {User} pUser 
     */
    let addUser = async pUser => {

        let promise = new Promise((resolve, reject) => {

            console.log("Interface: ", pUser);

            try {

                _bcryptjs2.default.genSalt(10, (err, salt) => {
                    _bcryptjs2.default.hash(pUser.password, salt, (err, hash) => {

                        if (err) throw err;

                        pUser.password = hash;

                        //Add user in Database
                        pUser.save((err, user) => {

                            if (err) throw err;

                            if (user) {
                                //console.log(user);
                                resolve(_lodash2.default.pick(user, ['_id', 'name', 'email', 'imgLink']));
                            } else {
                                resolve(null);
                            }
                        });
                    });
                });
            } catch (err) {

                _logger2.default.error("error in user.add {}", err);
                throw err;
            }
        });

        let callback = await promise;
        console.log("callback Add User: ", callback);
        return callback;
    };

    /**
     * 
     * @param {User} pUser 
     */
    let comparePassword = async (candidatePassword, hash) => {

        let promise = new Promise((resolve, reject) => {

            try {

                _bcryptjs2.default.compare(candidatePassword, hash, (err, isMatch) => {

                    if (err) throw err;

                    resolve(isMatch);
                    // callback(null, isMatch);
                });
            } catch (err) {

                _logger2.default.error("error in user.comparePassword {}", err);
                throw err;
            }
        });

        let callback = await promise;
        console.log("callback User compare passowrd: ", callback);
        return callback;
    };

    /**
     * 
     * @param {User} pUser
     * @param {string} pId
     */
    let updateUser = async (pUser, pId) => {

        let promise = new Promise((resolve, reject) => {

            let userModel = {};

            if (pUser.name) {
                userModel.name = pUser.name;
            }
            if (pUser.username) {
                userModel.username = pUser.username;
            }
            if (pUser.city) {
                userModel.city = pUser.city;
            }
            if (pUser.phone) {
                userModel.phone = pUser.phone;
            }
            if (pUser.gameRank) {
                userModel.gameRank = pUser.gameRank.toString().toLowerCase();
            }
            if (pUser.steamProfile) {
                userModel.steamProfile = pUser.steamProfile;
            }
            if (pUser.imgLink) {
                userModel.imgLink = pUser.imgLink;
            }
            if (pUser.coverImgLink) {
                userModel.coverImgLink = pUser.coverImgLink;
            }
            if (pUser.email) {
                userModel.email = pUser.email.toString().toLowerCase();
            }
            if (pUser.password) {
                userModel.password = pUser.password;
            }

            try {

                if (userModel.password != undefined) {

                    console.log("Interface User : Updating User Password");

                    _bcryptjs2.default.genSalt(10, (err, salt) => {
                        _bcryptjs2.default.hash(userModel.password, salt, (err, hash) => {
                            if (err) throw err;
                            userModel.password = hash;
                            //Add user in Database
                            interfaceDbModel_User.findByIdAndUpdate({ _id: pId }, userModel, (err, user) => {

                                if (err) throw err;

                                if (user) {
                                    resolve(user);
                                } else {
                                    resolve(null);
                                }
                            });
                        });
                    });
                } else {

                    console.log("Interface User : Updating User");

                    interfaceDbModel_User.findByIdAndUpdate({ _id: pId }, userModel, (err, user) => {

                        if (err) throw err;

                        if (user) {
                            resolve(user);
                        } else {
                            resolve(null);
                        }
                    });
                }
            } catch (err) {

                _logger2.default.error("error in user.updateUser {}", err);
                throw err;
            }
        });

        let callback = await promise;
        console.log("callback Update User: ", callback);
        return callback;
    };

    /**
     * 
     * @param {string} pGameRank
     */
    let searchUser = async pGameRank => {

        let promise = new Promise((resolve, reject) => {

            try {

                interfaceDbModel_User.find({ gameRank: { $regex: pGameRank, $options: 'i' } }).exec((err, users) => {

                    if (err) throw err;

                    if (users) {
                        resolve(users);
                    } else {
                        resolve(null);
                    }
                });
            } catch (err) {

                _logger2.default.error("error in user.searchUser {}", err);
                throw err;
            }
        });

        let callback = await promise;
        console.log("callback User Search Users: ", callback);
        return callback;
    };

    /**
     * 
     * @param {string} pEmail
     */
    let getParticipantUser = async pEmail => {

        let promise = new Promise((resolve, reject) => {

            try {

                interfaceDbModel_Puser.find({ 'emails': pEmail }, (err, user) => {

                    if (err) throw err;

                    if (user) {
                        resolve(user);
                    } else {
                        resolve(null);
                    }
                });
            } catch (err) {

                _logger2.default.error("error in user.searchUser {}", err);
                throw err;
            }
        });

        let callback = await promise;
        console.log("callback User Search Users: ", callback);
        return callback;
    };

    return {
        getUserById: getUserById,
        getUserByUsername: getUserByUsername,
        getUserByEmail: getUserByEmail,
        addUser: addUser,
        comparePassword: comparePassword,
        updateUser: updateUser,
        searchUser: searchUser,
        getParticipantUser: getParticipantUser
    };
};
//# sourceMappingURL=user.js.map