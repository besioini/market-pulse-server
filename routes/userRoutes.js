/*
    user routes 
    Public: Login & Register
    Private: get & update profile, delete account
*/

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/getProfile/:userId', authenticate, userController.getProfile);
router.put('/updateProfile/:userId', authenticate, userController.updateProfile);
router.delete('/deleteAccount/:userId', authenticate, userController.deleteAccount);

module.exports = router;

