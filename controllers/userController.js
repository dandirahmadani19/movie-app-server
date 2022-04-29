const { compareHashPassword } = require("../helpers/bcrypt");
const { createToken, convertTokenToPayLoad } = require("../helpers/jsonwebtoken");
const { User } = require("../models");
const {OAuth2Client} = require('google-auth-library');

class UserController {
    static async register(req, res, next) {
        try {
            const { email, password } = req.body;
            const newUser = await User.create({ email, password });

            if (!newUser) {
                throw { name: "FAILED_TO_CREATE_OR_UPDATE" };
            }

            res.status(201).json({
                statusCode: 201,
                message: "Add new user successfully",
                data: newUser
            })
        } catch (err) {
             next(err);
        }
    }
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({where: { email }});

            if (!user) {
                throw { name: "EMAIL_OR_PASSWORD_NOT_FOUND" };
            }

            const isPassword = compareHashPassword(password, user.password);

            if(!isPassword) {
                throw { name: "EMAIL_OR_PASSWORD_NOT_FOUND" };
            }

            const token = createToken({
                id: user.id,
                email: user.email
            })

            res.status(200).json({
                statusCode: 200,
                access_token: token
            })
        } catch (err) {
            next(err);
        }
    }
    static async loginGoogle(req, res, next) {
        try {
            const { token } = req.body;
            const client = new OAuth2Client(process.env.CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.CLIENT_ID,
            });
            const payLoad = ticket.getPayload();
            const [ user, created ] = await User.findOrCreate({
                where: { email: payLoad.email },
                defaults: {
                    password: (Math.random() + 1).toString(36).substring(2,7),
                    role: "staff"
                }
            })
            const access_token = createToken({
                id: user.id,
                email: user.email,
                role: user.role
            });

            res.status(200).json({
                statusCode: 200,
                access_token
            })
        } catch (err) {
            next(err);
        }
    }
    static async getUserProfile(req, res, next) {
        try {
            const token = req.headers.access_token;
            const { id } = convertTokenToPayLoad(token, process.env.SECRET_KEY);        
            const user = await User.findByPk(+id);
            if(!user) {
                throw { name: "USER_NOT_FOUND" };
            }
            res.status(200).json({
                statusCode: 200,
                data: user
            })
        } catch (err) {
            next(err)
        }

    }
}

module.exports = UserController;