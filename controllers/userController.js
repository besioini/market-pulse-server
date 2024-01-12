/*
    This controller handles User:
    Register
        Hash the password and saves the user
    Login 
        validates credentials & generates a token
    Authenticate
        generate a JWT token when a new user is successfully registered. This token can be used for immediate login after registration 
*/

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async(req, res) => {
    try {
        const { username, email, password } = req.body;
        const userExist = await User.findOne({ email });
        if(userExist){
            console.log('User already exists')
            return res.json({
                status: 400,
                message: 'User already exists'
            })
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        
        const user = new User({
            username, email, password: hashedPassword
        });
        
        user.save();

        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.status(201).json({ 
            message: 'User registered successfully', 
            token 
        });
        console.log('User registered successfully');
    } catch (err) {
        console.log('Registration error:', err.message);
        res.status(500).json({ 
            message: 'Error registering user',
            error: err.message 
        });
    }  
}

const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email }); 
        if(!user){
            return res.status(400).json({
                message: 'Invalid Credentials.'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                message: 'Invalid Credentials.'
            })
        }
        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.status(200).json({ 
            message: 'Login successful',
            token
        });
        console.log('Login successful')
    } catch (err) {
        console.log('Login error:', err.message);
        res.status(500).json({ 
            message: 'Error logging in', 
            error: err.message 
        });
    }
}

module.exports = { register, login}