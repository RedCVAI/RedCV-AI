const CV = require("./cv-model");
const AnalysisResult = require("./analysis-model");

module.exports = () => {
  CV.hasMany(AnalysisResult, { foreignKey: "cv_id" });
  AnalysisResult.belongsTo(CV, { foreignKey: "cv_id" });
};
