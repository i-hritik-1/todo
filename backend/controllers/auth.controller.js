const mongoose = require('mongoose');
const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "Chand143Raushan";
const authenticationToken = require('../middleware/auth.middleware');

exports.signUp = async (req, res) => {
    const {
        firstName, 
        lastName, 
        email, 
        password, 
        confirmPassword,
    } = req.body;

    if( 
        !firstName || 
        !lastName || 
        !email || 
        !password || 
        !confirmPassword
    ){
        return res.status(422)
            .json({
                error: "Some details are missing.",
                message: "Please provide all the required fields and try again."
            })
    }

    const userExists = await User.findOne({email: email});

    if(userExists){
        return res.status(422)
            .json({
                error: "User already exists.",
                message: "Please try to login or signup with a different email."
            })
    }

    if(password !== confirmPassword){
        return res.status(422)
            .json({
                error: "Passwords do not match.",
                message: "Please provide matching passwords and try again."
            })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create(
        {
            firstName: firstName,
            lastName : lastName,
            email : email,
            password: hashedPassword,
            confirmPassword: hashedPassword,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        }
    );

    if(user){
        return res.status(201)
            .json({
                message: "User created successfully.",
                user: user
            })
    }
    else{
        return res.status(500)
            .json({
                error: "Internal server error.",
                message: "Please try again later."
            })
    }
};

exports.login = async (req, res) => {
    try{
        const {
            email,
            password
        } = req.body;

        if(!email || !password)
        {
            return res.status(422)
            .json({
                error: "Email and password details are missing.",
                message: "Please provide all the required fields and try again."
            })  
        }

        const user = await User.findOne({email: email});

        if(!user)
        {
            return res.status(404)
            .json({
                error: "User not found.",
                message: "Please try to login with a different email."
            })
        }

        const validatePassword = await bcrypt.compare(password, user.password);

        if(validatePassword)
        {
            const token = jwt.sign(
                {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email : user.email,
                },
                JWT_SECRET,
                {
                    expiresIn: "24h"
                }
            );

            return res.status(200)
                .json({
                    message: "User logged in successfully.",
                    token: token
                })
        }
        else{
            return res.status(401)
                .json({
                    error: "Invalid credentials.",
                    message: "Please provide correct credentials and try again."
                })
        }   

    }
    catch(err){
        console.log(err);
    }
}

exports.resetPassword = async (req, res) => {
    const {
        email,
        password,
        newPassword,
        confirmNewPassword
    } = req.body;

    if(!email || !password || !newPassword || !confirmNewPassword)
    {
        return res.status(422)
            .json({
                error: "Some details are missing.",
                message: "Please provide all the required fields and try again."
            })
    }

    if(newPassword !== confirmNewPassword)
    {
        return res.status(422)
            .json({
                error: "Passwords do not match.",
                message: "Please provide matching passwords and try again."
            })
    }

    const user = await User.findOne({email: email});

    if(!user)
    {
        return res.status(404)
            .json({
                error: "User not found.",
                message: "Please enter correct email and try again."
            })
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    if(!validatePassword)
    {
        return res.status(401)
            .json({
                error: "Invalid credentials.",
                message: "Please provide correct credentials and try again."
            })
    }
    else{
        user.password = hashedPassword;
        await user.save();
        return res.status(200)
            .json({
                message: "Password reset successfully.",
                user: user
            })
    }
}