const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authenticate = require('../middleware/authenticate');

router.post('/createPayment', authenticate, orderController.createPayment)

module.exports = router;

