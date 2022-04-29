const { Genre } = require("../models");

class GenreController {
    static async findAll(req, res, next) {
        try {
            const genres = await Genre.findAll();
            res.status(201).json({
                statusCode: 201,
                data: genres
            })
        } catch (err) {
            next(err);
        }
    }
}

module.exports = GenreController;