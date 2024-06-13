const { findByEmail } = require("../models/Adminmodel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const privateKey = process.env.PRIVATE_KEY;

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findByEmail(email);

    if (user && user.password === password) {
      console.log("Password matched. Successfully logged in!");
      const token = jwt.sign({ payload: user }, privateKey);
      // console.log("Token:", token);
      res.status(200).json({
        status: 200,
        data: [user.id, user.name, user.email],
        token: token,
        message: "User logged in successfully",
      });
    } else {
      console.log("Password does not match!");
      res.status(400).json({
        status: 400,
        data: null,
        message: "Invalid Credentials.",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: 500,
      data: null,
      message: "Internal server error.",
    });
  }
};

// dashboardController.js
exports.adminData = async (req, res) => {
  try {
    if (!req.user) {
      console.log("Error Recieving Data from Decoded Token:");
    }
    res.send({
      id: req.user.payload.id,
      name: req.user.payload.name,
      email: req.user.payload.email,
      role: req.user.payload.role,
      pfpImage: req.user.payload.pfpImage,
      description: req.user.payload.description,
    });
  } catch (error) {
    console.error("Error Recieving Data from Decoded Token:", error);
    res.status(500).json({
      status: 500,
      data: null,
      message: "Internal server error.",
    });
  }
};

// Controller function to handle edit profile
const { editProfile } = require("../models/Adminmodel");

exports.editPfp = async (req, res) => {
  try {
    const { id, username, email, description } = req.body;
    const photoFileName = req.file.filename;
    const imagePath = `http://localhost:5000/public/uploads/pfp/${photoFileName}`;

    editProfile(id, username, email, description, imagePath);
    // Add your logic to update user profile with the received data
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error in editing profile:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

// Import adminModel from Sequelize setup (assuming Sequelize is correctly configured)
// const { adminInfo } = require("../models/Adminmodel");
const { adminModel } = require("../models/Adminmodel");

exports.adminInfo = async (req, res) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const admin = await adminModel.findOne({ where: { id: authorizationHeader } });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json(admin); // Send admin data response
  } catch (error) {
    console.error("Error in fetching admin info:", error);
    res.status(500).json({ message: "Failed to fetch admin info" });
  }
};
