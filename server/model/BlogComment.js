const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
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
    },
   
})
const comment = mongoose.model('BlogComment',commentSchema)
module.exports = comment