const dotenv = require("dotenv");
dotenv.config();
module.exports= {
    host: process.env.HOSTBDD,
    user: process.env.USUARIOBDD,
    password: process.env.CONTRASENABDD,
    database: process.env.DATABASE,
    claveSecretaJWT: process.env.KEYJWT,
    rol: {
        admin: 'admin',
        user: 'user'
    }
}