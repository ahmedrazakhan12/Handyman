const { Sequelize } = require("sequelize");
const sequelize = require("../config/database"); // Adjust the path as necessary

// Import models
const { adminModel } = require("./Adminmodel");
const { userModel } = require("./Usermodel");
const {Servicebooking} = require('./Servicebooking')
// Sync the model with the database, creating the table if it doesn't exist

Servicebooking.belongsTo(userModel, { foreignKey: 'user_id' });
const db = {};

// Initialize models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.adminModel = adminModel;
db.userModel = userModel;
db.Servicebooking = Servicebooking

// Add other models to db object
// db.userModel = userModel;

module.exports = db;
