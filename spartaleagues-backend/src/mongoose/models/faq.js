// Requires
import mongoose from 'mongoose';
import config  from './../../configDb/database';

// Post Schema
const FaqSchema = mongoose.Schema({
    faqQuestion: {
        type: String,
        require: true
    },
    faqAns: {
        type: String,
        require: true
    }
});

// Export
const Faq = module.exports = mongoose.model('Faq', FaqSchema);

// Add Post In Database
module.exports.addFaq = function(newFaq, callback) {
    newFaq.save(callback);
}