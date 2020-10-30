const jwt = require('jsonwebtoken');
const ENV = require('../ENV');

const isAuthenticated = async (req, res, next) => {
    // const bearerHeader = req.headers['authorization Bearer'];
    const token = req.headers['authorization'];
    if (token) {
        try {
            // const token = bearerHeader.split(' ')[0];
            const { username, _id } = await jwt.verify(token, ENV.SECRET_KEY)
            req.user = { username, _id };
            next();
        } catch (error) {
            res.status(403).json({ success: 'failed', msg: 'invalid Token' })
        }
    } else {
        res.status(403).json({ type: "failed", message: 'not authenticated' })
    }
}

exports.isAuthenticated = isAuthenticated;