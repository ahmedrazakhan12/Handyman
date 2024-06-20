const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const userModel = sequelize.define(
  "users",
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
    contact: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // Add length constraint if necessary
    },
    pfpImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
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
  userModel,
};
