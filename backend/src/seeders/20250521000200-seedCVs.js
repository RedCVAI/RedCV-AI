"use strict";
const CV = require("../models/cv-model");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      console.log("Starting seedCVs...");
      await CV.bulkCreate([
        {
          user_id: 1,
          file_name: "cimsky-cv.pdf",
          file_path: "Uploads/cimsky-cv.pdf",
          uploaded_at: new Date(),
        },
        {
          user_id: 1,
          file_name: "cimsky-cv-2.docx",
          file_path: "Uploads/cimsky-cv-2.docx",
          uploaded_at: new Date(),
        },
        {
          user_id: 2,
          file_name: "john-cv.pdf",
          file_path: "Uploads/john-cv.pdf",
          uploaded_at: new Date(),
        },
      ]);
      console.log("seedCVs completed.");
    } catch (error) {
      console.error("seedCVs error:", error.message);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("cvs", null, {});
  },
};
