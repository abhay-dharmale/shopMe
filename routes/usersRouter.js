const express = require('express');
const router = express.Router();

app.get('/', (req, res)=>{
  res.send('user');
})

module.exports = router