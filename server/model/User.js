const mongoose= require('mongoose');
const isEmail = require('validator');
const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : [true,'Enter username'],
        unique : true
    },
    firstName : {
        tyep : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique:true,
        required : [true,'Enter an email'],
        validate : [isEmail,'Enter a valid email']
    },
    password : {
        type : String,
        required : [true,'Enter a password'],
        minLength : [8,'Passwords should be minimum 8 chracaters long']  
    }
})
const User = mongoose.model('User',userSchema)
module.exports = User 