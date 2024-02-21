const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); 
const Order = require('../models/Order');

const createPayment = async (req, res) => {
    const { amount, items } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
        });

        const order = new Order({
            user: req.userData.userId,
            items: items,
            amount: amount,
            paymentStatus: 'Pending',
            transactionId: paymentIntent.id,
        });

        await order.save();

        res.status(201).json({ 
            clientSecret: paymentIntent.client_secret, 
            orderId: order._id 
        });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

module.exports = {
    createPayment
}