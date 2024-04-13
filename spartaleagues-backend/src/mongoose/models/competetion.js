// Requires
import mongoose from 'mongoose';
import config  from './../../configDb/database';

// Post Schema
const CompetetionSchema = mongoose.Schema({
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
    }
    ,
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
const Competetion = module.exports = mongoose.model('Competetions', CompetetionSchema);

// Add Post In Database
module.exports.addCompetetion = function(newCompetetion, callback) {
    newCompetetion.save(callback);
}