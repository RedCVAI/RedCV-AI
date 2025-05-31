"use strict";

module.exports = {
  up: async (QueryInterface, Sequelize) => {
    try {
      console.log("Starting seedAnalysisResults...");
      await QueryInterface.bulkInsert("analysis_results", [
        {
          cv_id: 1,
          analysis_data: JSON.stringify({
            score: 85,
            comments: "Strong technical skills but lacks project details",
            suggestions: [
              "Add more project descriptions.",
              "Highlight certifications",
            ],
          }),
          analyzed_at: new Date("2025-05-30T14:00:00.000Z"),
        },
        {
          cv_id: 2,
          analysis_data: JSON.stringify({
            score: 85,
            comments: "Strong technical skills but lacks project details.",
            suggestions: [
              "Add more project descriptions.",
              "Highlight certifications",
            ],
          }),
          analyzed_at: new Date("2025-05-30T15:00:00.000Z"),
        },
      ]);
      console.log("seedAnalysisResults completed.");
    } catch (error) {
      console.error("seedAnalysisResult error:", error.message);
      throw error;
    }
  },

  down: async (QueryInterface, Sequelize) => {
    await QueryInterface.bulkDelete("analysis_results", null, {});
  },
};
