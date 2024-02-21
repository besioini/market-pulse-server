const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    amount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        default: 'Pending',
    },
    transactionId: {
        type: String
    }
}, 
{
    timestamps: true
})

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order;