/*
    Server & database setup
        allow send json, url encoded & handling cors
        Running on PORT 5000
    MongoDB
        connecting DB to MOngoDB Atlas URI
    Routes
        Add routes
*/

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors());

const connectDB = async() => {
    try {
        const db = process.env.MONGODB_URI;
        // console.log(db)
        await mongoose.connect(db, 
            // { useNewUrlParser: true, useUnifiedTopology: true }
        );
            console.log('MongoDB successfully connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); 
        // Optional: Exit the process in case of a connection error
    }
}

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} ...`);
})


