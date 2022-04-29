const genreRouter = require("express").Router();
const GenreController = require("../controllers/genreController");

genreRouter.get("/", GenreController.findAll);

module.exports = genreRouter;