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

const getProduct = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            console.log('Product not found!');
            return res.status(404).json({
                message: 'Product not found',
            })
        }
        res.json(product);       
    } catch (error){
        console.log('Error fetching product', error.message);
        res.status(500).json({
            message: 'Error fetching product',
            error: error.message
        });
    }
};

const getAllSellerProducts = async (req, res) => {
    try {
        const sellerId = req.params.sellerId;
        const products = await Product.find({ seller: sellerId });
        
        if (!products) {
            console.log('No products found.')
            return res.status(404).json({ 
                message: 'No products found.' 
            });
        }
        console.log(products);
        res.json(products);
    } catch (error) {
        console.log('Error fetching products by seller:', error.message);
        res.status(500).json({
            message: 'Error fetching products by seller',
            error: error.message
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const product = await Product.findByIdAndUpdate(id, updates, { new: true });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        console.log('Product successfully updated');
        res.json(product);
    } catch (error) {
        console.log('Error updating product:', error.message);
        res.status(500).json({
            message: 'Error updating product',
            error: error.message
        });
    }
};

const removeProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        console.log('Product successfully removed');
        res.status(204).json({ message: 'Product successfully removed' });
    } catch (error) {
        console.log('Error removing product:', error.message);
        res.status(500).json({
            message: 'Error removing product',
            error: error.message
        });
    }
};

module.exports = {
    addProduct,
    getAllProducts,
    getProduct,
    getAllSellerProducts,
    updateProduct,
    removeProduct
}