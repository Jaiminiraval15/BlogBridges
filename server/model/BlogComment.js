const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
    comment : {
        type: String

    },
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    blogPostId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Blog'
    }
})
const Comment = mongoose.model('BlogComment',commentSchema)
module.exports = Comment