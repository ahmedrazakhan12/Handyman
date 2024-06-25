const db = require("../models/index");
require("dotenv").config();
const bcrypt = require("bcryptjs"); // Import bcryptjs for password hashing
const userModel = db.userModel;
const { Sequelize } = require("sequelize"); // Import Sequelize

exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      contact,
      address,
      status,
      service,
      country,
      region,
      city,
      postalCode,
      area,
    } = req.body;
    console.log(
      "Formdata:",
      name,
      email,
      password,
      contact,
      address,
      status,
      service,
      country,
      region,
      city,
      postalCode,
      area
    );

    let imagePath = null; // Changed from const to let
    // Check if req.file exists (new profile picture uploaded)
    if (req.file) {
      const photoFileName = req.file.filename;
      console.log("Photo File Name:", photoFileName);
      imagePath = `http://localhost:5000/public/uploads/pfp/${photoFileName}`;
      console.log("Image Path:", imagePath);
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password with bcrypt

    const user = await userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
      contact: contact,
      address: address,
      pfpImage: imagePath,
      status: status,
      service: service,
      country: country,
      region: region,
      city: city,
      postalCode: postalCode,
      area: area,
    });

    res.status(200).json({
      status: 200,
      data: user,
      message: "User registered successfully.",
    });
    console.log("User created:", user);
  } catch (error) {
    console.error("Error receiving data from decoded token:", error);
    if (error instanceof Sequelize.UniqueConstraintError) {
      return res.status(400).json({
        message: `Email: ${error.errors[0].value} is already registered.`,
      });
    }
    res.status(500).json({
      status: 500,
      data: null,
      message: "Internal server error.",
    });
  }
};

exports.getProviders = async (req, res) => {
  try {
    const providers = await userModel.findAll({
      where: { status: "provider" },
      order: [["id", "ASC"]],
    });
    res.send(providers);
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: null,
      message: "Internal server error.",
    });
  }
};


exports.getProvidersById = async (req, res) => {
  try {
    const provider = await userModel.findOne({
      where: { status: "provider"  , id: req.params.id },
    });
    res.send(provider);
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: null,
      message: "Internal server error.",
    });
  }
}
exports.search = async (req, res) => {
  try {
    const { key } = req.params;
    const users = await userModel.findAll({
      where: {
        status: "provider",
        [Sequelize.Op.or]: [
          { name: { [Sequelize.Op.iLike]: `%${key}%` } },
          { email: { [Sequelize.Op.iLike]: `%${key}%` } },
        ],
      },
    });
    res.send(users);
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: null,
      message: "Internal server error.",
    });
  }
};
