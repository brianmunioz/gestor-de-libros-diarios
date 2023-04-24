const jwt = require('jsonwebtoken');
const { claveSecretaJWT } = require('../config');
module.exports = function (req, res, next) {
        const token = req.headers['autorizacion'];
        if (!token) {
            const error = new Error('Token inexistente');
            error.status = 401;
            throw error;
        }
        jwt.verify(token, claveSecretaJWT, function (err, decodedToken) {
            if (err) {
                const error = new Error('Token inválido');
                error.status = 401;
                throw error;
            }
            req.user = decodedToken.user;         
            next();
        })
    }
