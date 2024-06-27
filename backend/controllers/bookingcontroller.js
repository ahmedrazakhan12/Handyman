const db = require("../models/index");
require("dotenv").config();
const bcrypt = require("bcryptjs"); // Import bcryptjs for password hashing
const Servicebooking = db.Servicebooking;
const userModel = db.userModel;
const { Sequelize } = require("sequelize"); // Import Sequelize
exports.getServicebooking = async (req, res) => {
    try {
      const bookings = await Servicebooking.findAll({
        where: {
          provider_id: req.params.id,
        },
        include: {
          model: userModel,
          attributes: ['id', 'name', 'email', 'contact' , 'address' , 'pfpImage'], // Specify attributes you want to include from userModel table
        },
      });
  
      res.status(200).json({
        status: 200,
        data: bookings,
        message: "Data fetched successfully.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        data: null,
        message: "Internal server error.",
      });
    }
  };