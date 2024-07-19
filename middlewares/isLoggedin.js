const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken');

module.exports.isLoggedin = async(req, res, next)=>{
    if(!req.cookies.token){
        req.flash('error', 'You must be logged in');
        res.redirect('/');
    }

    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModel.findOne({email: decoded.email}).select('-password');
        req.user = user;
        next();
        
    } catch (error) {
        req.flash('error', 'something went wrong');
        res.redirect('/');
    }
}