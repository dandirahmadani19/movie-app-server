const movieRouter = require("express").Router();
const MovieController = require("../controllers/movieController");
const authz = require("../middlewares/authz");

movieRouter.get("/", MovieController.findAll);
movieRouter.post("/add", MovieController.create);
movieRouter.get("/:id", MovieController.findByPk);
movieRouter.put("/update/:id", authz, MovieController.update);
movieRouter.get("/delete/:id", authz, MovieController.destroy);

module.exports = movieRouter;
