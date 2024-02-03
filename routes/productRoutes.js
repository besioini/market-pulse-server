/*
    Product routes
    Public: getProduct, getAllProducts
    Private: addProduct,UpdateProduct, removeProduct 
*/
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticate = require('../middleware/authenticate');

// Buyer
router.get('/getAllProducts', productController.getAllProducts);
router.get('/getProduct/:id', productController.getProduct);
// Seller
router.post('/addProduct', authenticate, productController.addProduct);
router.get('/getAllSellerProducts/:sellerId', authenticate, productController.getAllSellerProducts);
router.put('/updateProduct/:id', authenticate, productController.updateProduct);
router.delete('/removeProduct/:id', authenticate, productController.removeProduct);

module.exports = router;