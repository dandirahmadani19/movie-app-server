'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "dandirahmadani19",
          email: "dannyholewa@gmail.com",
          password: "admin",
          role: "admin",
          phoneNumber: "08987631121",
          address: "Medan, Indonesia",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  }
};
