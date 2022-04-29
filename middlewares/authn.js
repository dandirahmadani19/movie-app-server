const { convertTokenToPayLoad } = require("../helpers/jsonwebtoken");
const { User } = require("../models");

const authn = async (req, res, next) => {
    try {
        const { access_token } = req.headers;
        const payLoad = convertTokenToPayLoad(access_token, process.env.SECRET_KEY);
        const userFinded = await User.findByPk(+payLoad.id);
        if (!userFinded) {
            throw { name: "USER_NOT_FOUND" }
        }

        req.currentUser = {
            id: userFinded.id,
            email: userFinded.email,
            role: userFinded.role
        }

        next();
    } catch (err) {
        next(err);
    }
}

module.exports = authn;