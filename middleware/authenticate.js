/*
    This middleware handles JWT token authentication. It extracts the token from the Authorization header, decodes it using jwt.verify, and then attaches the decoded data to req.userData. 

    Review the concept of authenticate and add userId to requests
    without including it in the client requests, so it can be extracted from the session in this case JWT token
*/

const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ 
            message: 'Authentication failed' 
        });
    }
}

module.exports = authenticate;


