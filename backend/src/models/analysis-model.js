const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const CV = require("./cv-model");

const AnalysisResult = sequelize.define(
  "AnalysisResult",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cv_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "cvs",
        key: "id",
      },
    },
    analysis_data: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    analyzed_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "analysis_results",
    timetamps: false,
  }
);

AnalysisResult.belongsTo(CV, { foregnKey: "cv_id" });

module.exports = AnalysisResult;
