const db = require("../models/index");
require("dotenv").config();
const bcrypt = require("bcryptjs"); // Import bcryptjs for password hashing
const userModel = db.userModel;
const { Sequelize } = require("sequelize"); // Import Sequelize

exports.register = async (req, res) => {
  try {
    const { name, email, password, contact, address } = req.body;
    console.log("Formdata:", name, email, password, contact, address);

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

exports.users = async (req, res) => {
  try {
    const users = await userModel.findAll({
      order: [["id", "ASC"]],
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

exports.search = async (req, res) => {
  try {
    const { key } = req.params;
    const users = await userModel.findAll({
      where: {
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

exports.usersById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID:", id);
    const user = await userModel.findByPk(id);
    res.send(user);
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: null,
      message: "Internal server error.",
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { id, username, email, contact, address, password } = req.body;
    let imagePath = null; // Changed from const to let
    const imageIs = req.body.pfpImage;
    console.log("Image Is:", imageIs);
    const hashedPassword = await bcrypt.hash(password, 10);
    // Check if req.file exists (new profile picture uploaded)
    if (req.file) {
      const photoFileName = req.file.filename;
      imagePath = `http://localhost:5000/public/uploads/pfp/${photoFileName}`;
    }

    const updateProfile = async (
      id,
      name,
      email,
      contact,
      address,
      password,
      pfpImage
    ) => {
      const updateFields = { name, email, password, contact, address };

      // Only add pfpImage to updateFields if imagePath is not null
      if (imagePath !== null) {
        updateFields.pfpImage = pfpImage;
      }
      // Handle special case where imageIs === "null1"
      if (imageIs === "null1") {
        updateFields.pfpImage = null;
      }
      return await userModel.update(updateFields, { where: { id: id } });
    };

    // Call updateProfile to update user profile with the received data
    await updateProfile(
      id,
      username,
      email,
      contact,
      address,
      hashedPassword,
      imagePath
    );
    console.log("Profile Updated");
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.log("Profile not Updated", error);
    res.status(500).json({ message: "Profile not updated" });
  }
};

exports.imageDel = async (req, res) => {
  try {
    const { id } = req.params;
    await userModel.update({ pfpImage: null }, { where: { id: id } });
  } catch (err) {
    console.log("internal server error");
  }
};

exports.userDel = async (req, res) => {
  try {
    const { id } = req.params;
    // Attempt to delete the user
    const deletedUser = await userModel.destroy({ where: { id: id } });

    if (deletedUser) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the user" });
  }
};
