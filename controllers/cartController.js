/*
    cart controllers
    addToCart grabs userId, productId, quantity from req body, checks if product exist and checks for user cart, if not will create one and add items

    Review req.query and req.params
    // req.params.userId
    URL: http://localhost:5000/api/cart/getCart/658dc9826052bf54cf7c42d1   
    // req.query.userId 
    URL: http://localhost:5000/api/cart/getCart?userId=83469834 

*/

const Cart = require('../models/Cart')
const Product = require('../models/Product');

const addToCart = async(req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const product = await Product.findById(productId);

        if(!product){
            console.log('Product not found')
            return res.status(404).json({
                message: 'Product not found',
            })  
        };

        let cart = await Cart.findOne({ user: userId });
        if(!cart){
            cart = new Cart({ 
                user: userId,
                items: []
            })
        };

        const index = cart.items.findIndex(item => item.productId.toString() === productId);
        if(index > -1){
            cart.items[index].quantity += quantity;
        }else{
            cart.items.push({ productId, quantity});
        }

        await cart.save();
        res.status(201).json(cart);
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err.message
        });
        console.log('Internal server error', err.message);
    }
}

const getCart = async (req, res) => {
    try {
        const userId = req.params.userId;
        
        const cart = await Cart.findOne({ user: userId }).populate('items.productId');
        console.log(cart.items);
        if (!cart) {
            console.log('Cart not found!')
            return res.status(404).json({ 
                message: "Cart not found." 
            });
        }
        console.log(cart);
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ 
            message: "Internal server error", 
            error: err.message 
        });
        console.log('Internal server error', err.message);
    }
};

const updateCartItem = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found." });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
            if (cart.items[itemIndex].quantity <= 0) {
                cart.items.splice(itemIndex, 1); 
            }
        } else {
            return res.status(404).json({ message: "Item not found in cart." });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ 
                message: "Cart not found." 
            });
        }

        const itemIndex = cart.items.findIndex(
            item => item.productId.toString() === productId
        );

        if (itemIndex > -1) {
            cart.items.splice(itemIndex, 1);
        } else {
            return res.status(404).json({ 
                message: "Item not found in cart." 
            });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ 
            message: "Server Error", error: err.message 
        });
    }
};

module.exports = {
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart
}