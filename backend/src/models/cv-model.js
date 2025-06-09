const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const CV = sequelize.define(
  "CV",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      reference: {
        model: "users",
        key: "id",
      },
    },
    file_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    degree: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profesion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    uploaded_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "cvs",
    timestamps: false,
  }
);

module.exports = CV;
