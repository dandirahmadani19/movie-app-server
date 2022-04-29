const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = (data) => {
    return jwt.sign(data, process.env.SECRET_KEY); 
}

const convertTokenToPayLoad = (token, key) => {
    return jwt.verify(token, key);
}

module.exports = {
    createToken,
    convertTokenToPayLoad
}