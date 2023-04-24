const {sign} =  require('jsonwebtoken');
const  {claveSecretaJWT} = require('../config');
module.exports =   (usuario,hs)=> {
    return sign({ usuario }, claveSecretaJWT, { expiresIn: `${hs}`});
}