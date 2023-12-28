const mongoose = require('mongoose');
 const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true,
        default : null
    },
    content : {
        type : String,
        required : true
    },
    date : {
        default : Date.now()
    },
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }

 })
 const Blogs = mongoose.model('Blogs',blogSchema);
 module.exports = Blogs;