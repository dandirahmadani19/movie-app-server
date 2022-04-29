const { Movie } = require("../models");

const authz = async (req, res, next) => {
  try {
    const { id, role } = req.currentUser;
    const idMovie = req.params.id;
    const movie = await Movie.findByPk(+idMovie);
    if (!movie) {
        throw { name: "MOVIE_NOT_FOUND" };
    }

    if (id !== movie.authorId && role === "staff") {
        throw { name: "NOT_ALLOWED" };
    }

    next();
  } catch (err) {
      next(err);
  }
};

module.exports = authz;
