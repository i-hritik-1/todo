const mongoose = require('mongoose');
const checkList = require('../models/checkList.model.js');
const User = require('../models/user.model.js');

exports.createCheckList = async (req, res) => {

    try{
        

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            messsage:"Can not create checkList.",
            error: "Internal server error."
        })
    }

};
