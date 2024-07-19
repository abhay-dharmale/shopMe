const express = require('express');
const router = express.Router();
const isLoggedin = require('../middlewares/isLoggedin');

const products = [
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


router.get('/', (req, res) => {
    let error = req.flash('error');
    res.render('index', { error });
});

router.get('/shop', isLoggedin, (req, res) => {
    res.render('shop', {products});
});

module.exports = router;