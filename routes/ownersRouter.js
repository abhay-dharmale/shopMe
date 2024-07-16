const express = require('express');
const router = express.Router();
const ownerModel = require('../models/ownerModel');

app.get('/', (req, res)=>{
  res.send('owner');
})

module.exports = router