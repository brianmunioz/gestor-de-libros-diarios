const {sign} =  require('jsonwebtoken');
const  {claveSecretaJWT} = require('../config');
module.exports =  function (usuario,hs) {
    return sign({ usuario }, claveSecretaJWT, { expiresIn: `${hs}`});
}