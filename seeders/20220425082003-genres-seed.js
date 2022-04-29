'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const genres = require("../data/genres.json")
    genres.forEach(e => {
      e.createdAt = new Date();
      e.updatedAt = new Date();
    })
    
    await queryInterface.bulkInsert("Genres", genres, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Genres", null, {});
  }
};
