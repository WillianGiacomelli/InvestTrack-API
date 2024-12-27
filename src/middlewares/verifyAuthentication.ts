require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyAuthentication = (req, res, next) => {
    const {authorization} = req.headers;

    if(!authorization) {
        return res.status(401).json({error: true, message: 'Token not passed'});
    }
    const [prefix, token] = authorization.split(" ");

    if(prefix !== 'Bearer') {
        return res.status(401).json({error: true, message: 'Invalid token format'});
    }

    if(!token) {
        return res.status(401).json({error: true, message: 'Token not passed'});
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data;
        next();
    } catch (error) {
        return res.status(401).json({error: true, message: 'Token invalid'});
    }
}

export default verifyAuthentication;