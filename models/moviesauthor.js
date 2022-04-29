'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MoviesAuthor extends Model {
   
    static associate(models) {
      
    }
  }
  MoviesAuthor.init({
    genreId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MoviesAuthor',
  });
  return MoviesAuthor;
};