const mongoose = require('mongoose');
 const blogSchema =  new mongoose.Schema({
    title : {
        type : String,
        required : true
       
    },
    content : {
        type : String,
        required : true
    },
  
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }

 })
 const blog = mongoose.model('Blog',blogSchema);
 module.exports = blog;