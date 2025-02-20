const jwt = require('jsonwebtoken');
const User = require('../model/user.model');
const JWT_SECRET = 'Chand143Raushan'; // Replace with your actual JWT secret

const authenticationToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('Authorization Header:', authHeader); // Debug log

    if (!authHeader) {
        return res.status(401).json({
            error: "Authorization header is missing.",
            message: "Please provide a valid token."
        });
    }

    // Ensure the header starts with "Bearer "
    // if (!authHeader.startsWith('Bearer ')) {
    //     return res.status(401).json({
    //         error: "Invalid authorization format.",
    //         message: "Authorization header must start with 'Bearer '."
    //     });
    // }

    const token = authHeader.split(' ')[1];
    // console.log('Extracted Token:', token); // Debug log

    if (!token) {
        return res.status(401).json({
            error: "Token is missing.",
            message: "Please provide a valid token."
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // console.log('Decoded Token:', decoded); // Debug log

        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(404).json({
                error: "User not found.",
                message: "Please provide a valid token."
            });
        }

        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(403).json({
            error: "Invalid token.",
            message: "Please provide a valid token."
        });
    }
}

module.exports = authenticationToken;