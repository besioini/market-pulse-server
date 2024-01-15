/*
    Cart schema stores user selected items
    UserID & ann array or objects that hold each productID and quantity

*/

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true, 
        unique: true 
    },
    items: [{
        productId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product' 
        },
        quantity: { 
            type: Number, 
            required: true 
        }
    }],
})

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;