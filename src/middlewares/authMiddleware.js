const jwt = require('jsonwebtoken');
const config = require('config');

// Middleware to verify JWT
exports.verifyJWT = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send({ message: 'No token provided.' });
    }

    jwt.verify(token, config.get('secretKey'), (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Failed to authenticate token.' });
        }
        req.username = decoded.username;
        next();
    });
};
