const jwt = require('jsonwebtoken');
const ENV = require('../ENV');

const isAuthenticated = async (req, res, next) => {
    console.log("AUTH BEARER MIDDLEWARE");
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        try {
            const token = bearerHeader.split(' ')[0];
            const { username, _id } = await jwt.verify(token, ENV.SECRET_KEY);
            req.user = { username, _id };
            next();
        } catch (error) {
            console.log(error);
            res.status(403).json('invalid token')
        }
    } else {
        res.status(403).send('not authenticated')
    }
}

exports.isAuthenticated = isAuthenticated;