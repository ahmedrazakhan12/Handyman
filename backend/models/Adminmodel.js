const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const adminModel = sequelize.define(
  "admins",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true, // Ensure emails are unique
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pfpImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      // Add length constraint if necessary
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Add other attributes as needed
  },
  {
    // Additional model options can be defined here
  }
);

module.exports = {
  adminModel,
};
