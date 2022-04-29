const bcrypt = require("bcryptjs");

const hashing = ( password ) => {
    const salt = bcrypt.genSaltSync(7);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

const compareHashPassword = ( password, hashingPassword ) => {
    return bcrypt.compareSync(password, hashingPassword);
}

module.exports = {
    hashing,
    compareHashPassword
}