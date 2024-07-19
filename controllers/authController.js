const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async(req, res) => {
    try {
      let { fullname, email, password } = req.body;

      let user = await userModel.findOne({email: email})
      if(user) return res.status(400).send('email already exists');
  
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) return res.send(err.message);
          else {
            let user = await userModel.create({
              fullname,
              email,
              password:hash,
            });
            let token = generateToken(user)
            res.cookie("token", token);
            res.send('user created');
          }
        });
      });
    } catch (err) {
      res.send(err.message);
    }
  }

module.exports.loginUser = async(req, res) => {
  let { email, password } = req.body;
    
    let user = await userModel.findOne({ email: email });
    if (!user) res.status(400).send('Email or password incorrect');
    else{   
        bcrypt.compare(password, user.password, (err, result) => {
          // res.send(result)
            if(result){
                let token = generateToken(user)
                res.cookie("token", token);
                res.redirect('/shop');
            }else{
                res.status(400).send('Email or password incorrect');
            }
        })
    }
}

module.exports.logoutUser = (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};