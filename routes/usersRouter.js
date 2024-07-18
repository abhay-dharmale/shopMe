const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel')

router.get('/', (req, res)=>{
  res.send('user');
})

router.post('/create', async(req, res)=>{
  try{
      let {fullName, email, password} = req.body;

      let user = await userModel.create({
          fullName,
          email,
          password,
      });
      res.send(user)
  }
  catch(err){
      res.send(err.message);
  }
})


module.exports = router