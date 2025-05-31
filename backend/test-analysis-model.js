const AnalysisResult = require("./src/models/analysis-model");
const sequelize = require("./src/config/sequelize");

(async () => {
  try {
    await sequelize.sync({ force: false });
    const result = await AnalysisResult.create({
      cv_id: 1,
      analysis_data: { score: 85, comments: "Test analysis" },
    });
    console.log("AnalysisResult created:", result.dataValues);
  } catch (error) {
    console.error("Error:", error.message);
  }
})();
