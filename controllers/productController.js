/*
    This controller will handle add, get single product, all products, update and delete product
*/
const Product = require('../models/Product');


const addProduct = async(req, res) => {
    try {
        const { name, description, price, category, quantity, imageUrl, seller } = req.body;

        const product = new Product({
            name, description, price, category, quantity, imageUrl, seller
        })

        await product.save();
        console.log('Product successfully added');
        res.status(201).json({
            message: 'Product successfully added'
        })
    } catch (error) {
        console.log('Error adding product', error.message);
        res.status(500).json({
            message: 'Error adding product',
            error: error.message
        });
    }

}

const getAllProducts = async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        console.log('Error fetching products', error.message)
        res.status(500).json({
            message: 'Error fetching products',
            error: error.message
        })
    }
}
module.exports = {
    addProduct,
    getAllProducts
}