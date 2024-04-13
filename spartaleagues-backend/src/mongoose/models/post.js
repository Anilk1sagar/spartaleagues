// Requires
import mongoose from 'mongoose';
import config  from './../../configDb/database';
import mongoosePaginate from 'mongoose-paginate';

// Post Schema
    const PostSchema = mongoose.Schema({
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
    PostSchema.plugin(mongoosePaginate);

// Export
    const Post = module.exports = mongoose.model('Post', PostSchema);

// Add Post In Database
    module.exports.addPost = function(newPost, callback) {
        newPost.save(callback);
    }