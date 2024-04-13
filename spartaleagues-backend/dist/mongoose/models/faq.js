'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _database = require('./../../configDb/database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Post Schema
// Requires
const FaqSchema = _mongoose2.default.Schema({
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
const Faq = module.exports = _mongoose2.default.model('Faq', FaqSchema);

// Add Post In Database
module.exports.addFaq = function (newFaq, callback) {
    newFaq.save(callback);
};
//# sourceMappingURL=faq.js.map