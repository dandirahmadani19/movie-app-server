'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    
    static associate(models) {
      Movie.belongsTo(models.User, {
        foreignKey: "authorId",
      });
      Movie.belongsTo(models.Genre, {
        foreignKey: "genreId",
      });
      Movie.belongsToMany(models.User, { 
        through: "MoviesAuthors",
        foreignKey: "movieId",
      })
    }
  }
  Movie.init({
    title: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Title is required"
        },
        notEmpty: {
          args: true,
          msg: "Title is required"
        }
      }
     },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Synopsis is required"
        },
        notEmpty: {
          args: true,
          msg: "Synopsis is required"
        }
      }
    },
    trailerUrl: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1,
          msg: "Minimal rating is 1"
        }
      }
    },
    genreId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};