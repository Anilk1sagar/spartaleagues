// Requires
import mongoose from 'mongoose';
import config  from './../../configDb/database';

// Post Schema
const ParticipantsUserSchema = mongoose.Schema({
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
const ParticipantsUser = module.exports = mongoose.model('ParticipantsUser', ParticipantsUserSchema);

// // Add Post In Database
// module.exports.addPuser = function(newPuser, callback) {
//     newPuser.save(callback);
// }

// // Add Post In Database
//     module.exports.addUser = function(newUser, callback) {
//         newUser.save(callback);
//     }