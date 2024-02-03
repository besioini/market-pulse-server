/*
 Stores Prodcut info: name, description, price, category, quantity, seller-id & products images URL (array to store multiple images & uses URL)
*/

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },  
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    imageUrl: [{ 
        type: String,
        required: true
    }] 
},
{ 
    timestamps: true, 
})

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;