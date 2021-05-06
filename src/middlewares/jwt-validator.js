const { response, request } = require('express');
const jwt = require('jsonwebtoken');


const validateJWT = (req = request, res = response, next) => {

    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            isAuthenticated: false,
            msg: 'Token is missing in the request'
        })
    };

    try {
        // This is the payload
        const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.uid = uid;
        req.name = name;


    } catch (error) {
        console.log(error);
        return res.status(401).json({
            isAuthenticated: false,
            msg: 'Token is not valid'
        })
    }


    next();

};


module.exports = { validateJWT }