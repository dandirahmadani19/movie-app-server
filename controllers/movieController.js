const { Movie, Genre, User } = require("../models");

class MovieController {
    static async create(req, res, next) {
        try {
            const authorId = req.currentUser.id;
            let { title, synopsis, trailerUrl, imgUrl, rating, genreId } = req.body;
            rating = +rating;
            genreId = +genreId;
            const newMovie = await Movie.create({ title, synopsis, trailerUrl, imgUrl, rating, genreId, authorId });

            if (!newMovie) {
                throw { name: "FAILED_TO_CREATE_OR_UPDATE" };
            }

            res.status(201).json({
                statusCode: 201,
                message: "Adding Movie successfully",
                data: newMovie
            })

        } catch(err) {
            next(err)
        }
    }
    static async findAll(req, res, next) {
        try {
            const movies = await Movie.findAll({
                include: [
                    {
                        model: Genre,
                        attributes: ['name']
                    },
                    {
                        model: User,
                        attributes: ['email', 'role']
                    }
                ]
            });

            res.status(200).json({
                statusCode: 200,
                data: movies
            })
        } catch (err) {
            next(err);
        }
    }
    static async findByPk(req, res, next) {
        try {
            const id = req.params.id;
            const movie = await Movie.findByPk(+id);
            if (!movie) {
                throw { name: "MOVIE_NOT_FOUND" };

            }

            res.status(200).json({
                statusCode: 200,
                data: movie
            })
           
        } catch (err) {
            next(err);
        }
    }
    static async update(req, res, next) {
        try {
            const id = req.params.id;
            let { title, synopsis, trailerUrl, imgUrl, rating, genreId } = req.body;
            rating = +rating;
            genreId = +genreId;
            const newMovie = await Movie.update(
                { title, synopsis, trailerUrl, imgUrl, rating, genreId },
                { where: { id }, returning: true}
            );
            
            if (newMovie[0] <= 0) {
                throw { name: "MOVIE_NOT_FOUND" };
            }

            res.status(201).json({
                statusCode: 201,
                message: "Updating Movie successfully",
                data: newMovie[1]
            })

        } catch(err) {
            next(err);
        }
    }
    static async destroy(req, res, next) {
        try {
            const id = req.params.id;
            const movieTitle = await Movie.findByPk(+id, { attributes: ['title'], raw: true });
            const movie = await Movie.destroy({ where: { id } });

            if (!movie) {
                throw { name: "MOVIE_NOT_FOUND" };
            }

            res.status(200).json({
                statusCode: 200,
                message: `Movie ${movieTitle.title} success to delete`
            })
           
        } catch (err) {
            next(err);
        }
    }

}

module.exports = MovieController;