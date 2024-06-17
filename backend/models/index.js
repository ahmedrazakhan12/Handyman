const { Sequelize } = require("sequelize");
const sequelize = require("../config/database"); // Adjust the path as necessary

// Import models
const { adminModel } = require("./Adminmodel");
const { userModel } = require("./Usermodel");
// Sync the model with the database, creating the table if it doesn't exist

const db = {};

// Initialize models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.adminModel = adminModel;
db.userModel = userModel;
// Add other models to db object
// db.userModel = userModel;

module.exports = db;
