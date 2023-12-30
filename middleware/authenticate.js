const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = decode;
    } catch (error) {
        return res.status(401).json({ 
            message: 'Authentication failed' 
        });
    }
}

module.exports = authenticate;