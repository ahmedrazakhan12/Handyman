const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Servicebooking = sequelize.define(
  "Servicebooking",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // Define foreign key relationship to User table
      references: {
        model: "users",
        key: "id",
      },
    },
    provider_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // Define foreign key relationship to User table
      references: {
        model: "users",
        key: "id",
      },
    },
    service: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: true, // Adjust as needed
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    payment_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Additional model options can be defined here
    timestamps: true, // Adds createdAt and updatedAt fields
    tableName: "Servicebookings", // Optional: Define the table name explicitly
  }
);

module.exports = {
  Servicebooking,
};
