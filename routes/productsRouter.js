const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const productModel = require("../models/productModel");

router.post("/create", upload.single("image"), async (req, res) => {
  let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

  let product = await productModel.create({
    image: req.file.buffer,
    name, 
    price, 
    discount, 
    bgcolor, 
    panelcolor, 
    textcolor
  });
  res.send(product);
});

module.exports = router;
