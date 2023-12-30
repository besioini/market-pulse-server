const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');

// server setup
const app = express();
// to allow send json
app.use(express.json())
// to allow send url encoded
app.use(express.urlencoded({ extended: false }))
// to handle CORS
app.use(cors());


// database setup
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
        process.exit(1); // Optional: Exit the process in case of a connection error
    }
}
// Connect DB
connectDB();


// routes
app.use('/api/users', userRoutes)

// Run Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} ...`);
})


