/*
    Server & database setup
        allow send json, url encoded & handling cors
        Running on PORT 5000
    MongoDB
        connecting DB to MOngoDB Atlas URI
    Routes
        Add routes
*/
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const morgan = require('morgan');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors());
// app.use(morgan('combined'));

const db = process.env.MONGODB_URI;

const connectDB = async() => {
    try {
        await mongoose.connect(db);
            console.log('MongoDB successfully connected...');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}...`);
})


