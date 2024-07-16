const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/shopMe');

const userSchema = mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    cart: {
        type: Array,
        default: []
    },
    isAdmin: Boolean,
    orders: {
        type: Array,
        default: []
    },
    contact: Number,
    profilePicture: String,
})

module.exports = mongoose.model('user', userSchema);