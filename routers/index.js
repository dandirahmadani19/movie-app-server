const routes = require("express").Router();
const genreRouter = require("./genreRouter")
const userRouter = require("./userRouter")
const movieRouter = require("./movieRouter");
const authn = require("../middlewares/authn");

routes.use("/users", userRouter);
routes.use("/genres", authn, genreRouter);
routes.use("/movies", authn, movieRouter);

module.exports = routes;
