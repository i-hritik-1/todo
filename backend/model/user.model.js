const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName :{
        type: String,
        trim: true,
        required: true
    },
    lastName :{
        type: String,
        trim: true,
        required: true
    },
    email :{
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    password : {
        type : String,
        required : true,
        trim : true
    },
    confirmPassword : {
        type : String,
        required : true,
        trim : true
    },
    image : {
        type : String,
        trim: true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;

