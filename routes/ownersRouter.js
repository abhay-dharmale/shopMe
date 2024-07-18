const express = require('express');
const router = express.Router();
const ownerModel = require('../models/ownerModel');

router.get('/', (req, res) => {
  res.send('Welcome');
})

if(process.env.NODE_ENV === 'development'){
  router.post('/create', async(req, res) => {
    let owners = await ownerModel.find();
    if(owners.length > 0) {
      return res
      .status(504)
      .send("you don't have permission to create");
    }
    let {fullname, email, password} = req.body;
    let createdowner = await ownerModel.create({
      fullname,
      email,
      password,
    })
    res.status(201).send(createdowner);
  })
}

module.exports = router;