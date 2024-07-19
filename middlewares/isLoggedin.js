const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const isLoggedin = async (req, res, next) => {
    if (!req.cookies.token) {
        req.flash('error', 'You must be logged in');
        return res.redirect('/');
    }

    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModel.findOne({ email: decoded.email }).select('-password');
        if (!user) {
            req.flash('error', 'User not found');
            return res.redirect('/');
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        req.flash('error', 'Something went wrong');
        res.redirect('/');
    }
};

module.exports = isLoggedin;