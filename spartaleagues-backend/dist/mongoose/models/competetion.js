'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _database = require('./../../configDb/database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Post Schema
// Requires
const CompetetionSchema = _mongoose2.default.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    gameName: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    entryFees: {
        singlePlayerMode: {
            type: Number
            //require: true
        },
        multiPlayerMode: {
            type: Number,
            require: true
        }
    },

    date: {
        type: String,
        require: true
    },
    isDone: {
        type: Boolean,
        default: false
    },
    updated_date: {
        type: Date,
        default: Date.now
    }
});

// Export
const Competetion = module.exports = _mongoose2.default.model('Competetions', CompetetionSchema);

// Add Post In Database
module.exports.addCompetetion = function (newCompetetion, callback) {
    newCompetetion.save(callback);
};
//# sourceMappingURL=competetion.js.map