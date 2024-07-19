const express = require('express');
const router = express.Router();
const ownerModel = require('../models/ownerModel');

const success = [
  {
      name: 'Product 1',
      price: 1000,
      image: Buffer.from('base64string', 'base64'), // Replace 'base64string' with actual base64 image data
      bgcolor: '#333',
      panelcolor: '#f8f8f8',
      textcolor: '#333333'
  },
  {
      name: 'Product 2',
      price: 2000,
      image: Buffer.from('base64string', 'base64'),
      bgcolor: '#222',
      panelcolor: '#f8f8f8',
      textcolor: '#333333'
  }
  // Add more products as needed
];

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

router.get('/admin', (req, res) => {
  res.render('createproducts', {success});
})

module.exports = router;