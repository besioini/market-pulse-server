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
// router.put('/updateCartItem', cartController.updateCartItem);
// router.delete('/removeFromCart', cartController.removeFromCart);

module.exports = router;

