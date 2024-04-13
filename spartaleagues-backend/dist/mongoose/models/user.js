'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _database = require('./../../configDb/database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import bcrypt from 'bcryptjs';

// User Schema
// Requires
const UserSchema = _mongoose2.default.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    city: {
        type: String,
        default: null
    },

    phone: {
        type: Number,
        default: null
    },

    gameRank: {
        type: String,
        default: null
    },

    steamProfile: {
        type: String,
        default: null
    },

    imgLink: {
        type: String,
        default: null
    },
    coverImgLink: {
        type: String,
        default: null
    },

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = _mongoose2.default.model('User', UserSchema);

//// Get User By Id
// module.exports.getUserById = function(id, callback) {
//     User.findById(id, callback);
// }


// // Get User By teamname
//     module.exports.getUserByEmail = function(email, callback) {
//         const query = {email: email};
//         User.findOne(query, callback);
//     }

// // Add User In Database
//     module.exports.addUser = function(newUser, callback) {
//         bcrypt.genSalt(10, (err, salt) => {
//             bcrypt.hash(newUser.password, salt, (err, hash) => {
//                 if(err) throw err;
//                 newUser.password = hash;
//                 //Add user in Database
//                 newUser.save(callback);
//             });
//         });
//     }

// // Update User In Database
// module.exports.updateUser = function(newUser, id, callback) {
//     if(newUser.password !=undefined) {
//         bcrypt.genSalt(10, (err, salt) => {
//             bcrypt.hash(newUser.password, salt, (err, hash) => {
//                 if(err) throw err;
//                 newUser.password = hash;
//                 //Add user in Database
//                 User.findByIdAndUpdate({_id: id}, newUser, callback);
//             });
//         });
//     } else {
//         User.findByIdAndUpdate({_id: id}, newUser, callback);
//     }
// }

// // Compare Password For Login
//     module.exports.comparePassword = function(candidatePassword, hash, callback) {
//         bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
//             if(err) throw err;
//             callback(null, isMatch);
//         });
//     }
//# sourceMappingURL=user.js.map