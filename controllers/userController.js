/*
    This controller handles User:
    Register
        Hash the password and saves the user
    Login 
        validates credentials & generates a token
    Authenticate
        generate a JWT token when a new user is successfully registered. This token can be used for immediate login after registration 

    Review mongoose select method to exclude password from the response(security resaons), instead of using: const { password, ...userData } = user.toObject();
    I can also add 'select: flase' to the model to not include a certain field by default

    { new: true, runValidators: true }) runValidators option ensures that Mongoose runs schema validation for the update operation, just as it does for document creation. Without this option, schema validations defined in your Mongoose model (like required, min, max, or custom validators) are not applied during updates, which could lead to invalid data being stored in database.



*/

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async(req, res) => {
    try {
        const { firstname, lastname, username, email, password, type } = req.body;
        const userExist = await User.findOne({ email });
        if(userExist){
            console.log('User already exists')
            return res.json({
                status: 409,
                message: 'User already exists'
            })
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        
        const user = new User({
            firstname, lastname, username, email, password: hashedPassword, type
        });
        
        await user.save();

        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.status(201).json({ 
            message: 'User registered successfully', 
            token,
            userType: user.type
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
            token,
            userType: user.type
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

const getProfile = async (req, res) => {
    try {
        const userId = req.userData.userId; 
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (err) {
        console.log('Error fetching user profile:', err.message);
        res.status(500).json({ message: 'Error fetching profile', error: err.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { firstname, lastname, username, email } = req.body;
        const userId = req.userData.userId;
        
        if (email) {
            const existingUser = await User.findOne({ 
                email: email, 
                _id: { $ne: userId } 
            });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already exists' });
            }
        }

        const updates = { firstname, lastname, username, email };
        const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-password');

        if (!user) {
            consloe.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('Profile updated successfully');
        res.status(200).json({
            data: user,
            message: 'Profile updated successfully'
        });
    } catch (err) {
        console.log('Error updating user profile:', err.message);
        res.status(500).json({ message: 'Error updating profile', error: err.message });
    }
};

const deleteAccount = async (req, res) => {
    try {
        const userId = req.userData.userId; 
        const user = await User.findById(userId);

        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        await User.findByIdAndDelete(userId);

        console.log('Account deleted successfully');
        res.status(200).json({ 
            message: 'Account deleted successfully' 
        });
    } catch (err) {
        console.log('Error deleting account:', err.message);
        res.status(500).json({ 
            message: 'Error deleting account', 
            error: err.message 
        });
    }
};

module.exports = { register, login, getProfile, updateProfile, deleteAccount }