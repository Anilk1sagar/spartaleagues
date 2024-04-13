'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _database = require('./../../configDb/database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Post Schema
// Requires
const ParticipantsUserSchema = _mongoose2.default.Schema({
    mode: {
        type: String,
        require: true
    },
    competetionName: {
        type: String,
        require: true
    },
    competetionDate: {
        type: String,
        require: true
    },
    gameName: {
        type: String,
        require: true
    },
    payment_id: {
        type: String,
        require: true
    },
    txnId: {
        type: String,
        require: true
    },
    teamName: {
        type: String,
        require: true
    },
    contact: {
        type: Number,
        require: true
    },
    emails: [{
        type: String,
        require: true
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

// Export
const ParticipantsUser = module.exports = _mongoose2.default.model('ParticipantsUser', ParticipantsUserSchema);

// // Add Post In Database
// module.exports.addPuser = function(newPuser, callback) {
//     newPuser.save(callback);
// }

// // Add Post In Database
//     module.exports.addUser = function(newUser, callback) {
//         newUser.save(callback);
//     }
//# sourceMappingURL=participantsUser.js.map