const mongoose = require('mongoose');
const User = require('./user.model');

const checkListSchema = new mongoose.Schema({
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
    },
    task :{
        type: String,
        trim: true,
        required: true
    },
    endingDate :{
        type: Date,
        required: true
    },
    completed :{
        type: Boolean,
        default: false
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

const CheckList = mongoose.model('CheckList', checkListSchema);
module.exports = CheckList;