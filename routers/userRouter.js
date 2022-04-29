const userRouter = require("express").Router();
const UserController = require("../controllers/userController");

userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);
userRouter.post("/login-google", UserController.loginGoogle);
userRouter.get("/detail-profile", UserController.getUserProfile)
module.exports = userRouter;
