const express = require('express');
const router = express.Router();
const isLoggedin = require('../middlewares/isLoggedin');
const productModel = require('../models/productModel');
const userModel = require('../models/userModel');


router.get('/', (req, res) => {
    let error = req.flash('error');
    res.render('index', { error, loggedin: false });
});

router.get('/shop', isLoggedin, async(req, res) => {
    let products = await productModel.find();
    let success = req.flash('success');
    res.render('shop', {products, success});
});

router.get('/cart', isLoggedin, async(req, res) => {
    let user = await userModel.findOne({email: req.user.email}).populate('cart');
    
    // let bill = user.cart.price + 20 - user.cart.discount
    res.render('cart', {user});
});

router.get('/addtocart/:productid', isLoggedin, async(req, res) => {
    let user = await userModel.findOne({email: req.user.email});
    user.cart.push(req.params.productid);
    await user.save()
    req.flash('success', 'added to cart')
    res.redirect('/shop')
});

module.exports = router;