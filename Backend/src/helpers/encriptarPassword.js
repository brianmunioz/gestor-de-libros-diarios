const {  hashSync, genSaltSync } = require('bcrypt');
module.exports = (password) => {
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);    
    return hashedPassword
}