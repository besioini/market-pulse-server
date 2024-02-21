/*
    cart routes 
    All routes are private: get, add, update and remove
*/

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authenticate = require('../middleware/authenticate');

router.post('/addToCart', authenticate, cartController.addToCart);
router.get('/getCart/:userId', authenticate, cartController.getCart);
router.put('/updateCartItem', authenticate, cartController.updateCartItem);
router.delete('/removeFromCart/:itemId', authenticate, cartController.removeFromCart);

module.exports = router;

