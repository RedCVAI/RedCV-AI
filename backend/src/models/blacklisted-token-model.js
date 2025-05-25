const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

class BlacklistedToken extends Model {}

BlacklistedToken.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING(512),
      allowNull: false,
      unique: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "BlacklistedToken",
    tableName: "blacklisted_tokens",
    timestamps: false,
  }
);

module.exports = BlacklistedToken;