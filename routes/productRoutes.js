/*
    Product routes
    Public: getProduct, getAllProducts
    Private: addProduct,UpdateProduct, removeProduct 
*/
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticate = require('../middleware/authenticate');

router.post('/addProduct', authenticate, productController.addProduct);
router.get('/getAllProducts', productController.getAllProducts);
// router.get('/getProduct/:id', productController.getProduct);
// router.put('/updateProduct/:id', authenticate, productController.updateProduct);
// router.delete('/deleteProduct/:id', authenticate, productController.deleteProdcut);

module.exports = router;