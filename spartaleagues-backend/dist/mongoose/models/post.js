'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _database = require('./../../configDb/database');

var _database2 = _interopRequireDefault(_database);

var _mongoosePaginate = require('mongoose-paginate');

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Post Schema
const PostSchema = _mongoose2.default.Schema({
    gameName: {
        type: String,
        require: true
    },
    heading: {
        type: String,
        require: true
    },
    imgLink: {
        type: String
    },
    videoLink: {
        type: String
    },
    description: {
        type: String,
        require: true
    },
    updated_date: {
        type: Date,
        default: Date.now
    }
});

// Pagination Initialize
// Requires
PostSchema.plugin(_mongoosePaginate2.default);

// Export
const Post = module.exports = _mongoose2.default.model('Post', PostSchema);

// Add Post In Database
module.exports.addPost = function (newPost, callback) {
    newPost.save(callback);
};
//# sourceMappingURL=post.js.map