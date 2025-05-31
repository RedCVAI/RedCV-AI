"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Rany Widiastuti",
          email: "ranywidiastuti@gmail.com",
          password: await bcrypt.hash("password123", 10),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Hendro Cahyono",
          email: "Hendro Cahyono@gmail.com",
          password: await bcrypt.hash("password123", 10),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
