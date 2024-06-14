const db = require("../models/index");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const privateKey = process.env.PRIVATE_KEY;
const adminModel = db.adminModel;

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await adminModel.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: "Invalid Credentials.",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      console.log("Password matched. Successfully logged in!");

      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email },
        privateKey,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        status: 200,
        data: { id: user.id, name: user.name, email: user.email },
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
exports.adminData = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({
        status: 400,
        message: "Error receiving data from decoded token.",
      });
    }

    res.send({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      pfpImage: req.user.pfpImage,
      description: req.user.description,
    });
  } catch (error) {
    console.error("Error receiving data from decoded token:", error);
    res.status(500).json({
      status: 500,
      data: null,
      message: "Internal server error.",
    });
  }
};

// Controller function to handle edit profile

exports.editPfp = async (req, res) => {
  try {
    const { id, username, email, description } = req.body;
    const photoFileName = req.file.filename;
    const imagePath = `http://localhost:5000/public/uploads/pfp/${photoFileName}`;

    // Method to find adminModel by email
    const editProfile = async (id, name, email, description, pfpImage) => {
      return await adminModel.update(
        { name, email, description, pfpImage },
        { where: { id: id } }
      );
    };

    // Call editProfile to update user profile with the received data
    await editProfile(id, username, email, description, imagePath);

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error in editing profile:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

// Import adminModel from Sequelize setup (assuming Sequelize is correctly configured)
exports.adminInfo = async (req, res) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const admin = await adminModel.findOne({
      where: { id: authorizationHeader },
    });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json(admin); // Send admin data response
  } catch (error) {
    console.error("Error in fetching admin info:", error);
    res.status(500).json({ message: "Failed to fetch admin info" });
  }
};

const bcrypt = require("bcryptjs"); // Import bcryptjs for password hashing

// Register Admin
exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Input validation
    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Password hashing
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password with bcrypt

    // Create admin record
    const admin = await adminModel.create({
      name: username,
      email: email,
      password: hashedPassword, // Store hashed password
      role: role,
    });

    // Respond with success message
    res.status(200).json({ message: "Admin registered successfully" });
  } catch (error) {
    // Check if the error is due to duplicate email
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        message: `Email: ${error.fields.email} is already registered.`,
      });
    }

    console.error("Error in registering admin:", error);
    res.status(500).json({ message: "Failed to register admin" });
  }
};

// Change Password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res
        .status(400)
        .json({ message: "Authorization header is missing" });
    }

    const email = authorizationHeader.split(" ")[1];
    if (!email) {
      return res
        .status(400)
        .json({ message: "Authorization header is malformed" });
    }

    const admin = await adminModel.findOne({ where: { email: email } });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      admin.password
    );
    if (isPasswordMatch) {
      console.log("Password  not match");
    }
    if (!isPasswordMatch) {
      console.log("Password does not match");
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await adminModel.update(
      { password: hashedPassword },
      { where: { email: email } }
    );

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error in changing password:", error);
    return res.status(500).json({ message: "Failed to change password" });
  }
};


exports.team = async (req, res) => {
  try {
    const admins = await adminModel.findAll();
    res.status(200).json(admins);
  } catch (error) {
    console.error("Error in Finding admins:", error);
    return res.status(500).json({ message: "Failed to find admins" });
  }
};