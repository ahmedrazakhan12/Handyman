const db = require("../models/index");
require("dotenv").config();
const bcrypt = require("bcryptjs"); // Import bcryptjs for password hashing
const userModel = db.userModel;
const { Sequelize } = require("sequelize"); // Import Sequelize

const {
  validateName,
  validateEmail,
  validateContact,
  validatePassword,
  validServiceType,
  validateCountry,
  validateState,
  validatePostalCode,
  validateCity,
  validateAddress,
} = require("../middlewares/Validate");

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
      region,
      country,
      
      city,
      postalCode,
      confirmPassword
    } = req.body;

    // console.log("name: " , name , "email: " , email , "password: " , password ,"confirmPassword" , confirmPassword);

    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const contactError = validateContact(contact);
    const passwordError = validatePassword(password , confirmPassword);
    const serviceError = validServiceType(service);
    const countryError = validateCountry(country);
    const stateError = validateState(region);
    const postalCodeError = validatePostalCode(postalCode);
    const cityError = validateCity(city);
    const addressError = validateAddress(address);

    if (
      nameError ||
      emailError ||
      contactError ||
      passwordError ||
      serviceError ||
      countryError ||
      stateError ||
      postalCodeError ||
      cityError ||
      addressError
    ) {
      return res.status(400).json({
        status: 400,
        data: null,
        message:
          nameError ||
          emailError ||
          contactError ||
          passwordError ||
          serviceError ||
          countryError ||
          stateError ||
          postalCodeError ||
          cityError ||
          addressError,
      });
    }

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
      city: city,
      postalCode: postalCode,
      region:region
    });

    res.status(200).json({
      status: 200,
      data: user,
      message: "User registered successfully.",
    });
    console.log("User created:", user);
  } catch (error) {
    if (error.name === "SequelizeDatabaseError" && error.original) {
      res.status(400).json({
        status: 400,
        data: error,
        message: ` ${error.original}`,
      });
    }
    if (error instanceof Sequelize.UniqueConstraintError) {
      res.status(400).json({
        message: `Email: ${error.errors[0].value} is already registered.`,
      });
    }
    console.error("Error receiving data from decoded token:", error);
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
      where: { status: "provider", id: req.params.id },
    });
    res.send(provider);
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

exports.updateProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      contact,
      address,
      service,
      country,
      city,
      postalCode,
      region,
      pfpImage,
      createdAt,
    } = req.body;

    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const contactError = validateContact(contact);
    const serviceError = validServiceType(service);
    const countryError = validateCountry(country);
    const stateError = validateState(region);
    const postalCodeError = validatePostalCode(postalCode);
    const cityError = validateCity(city);
    const addressError = validateAddress(address);

    if (
      nameError ||
      emailError ||
      contactError ||
      serviceError ||
      countryError ||
      stateError ||
      postalCodeError ||
      cityError ||
      addressError
    ) {
      return res.status(400).json({
        status: 400,
        data: null,
        message:
          nameError ||
          emailError ||
          contactError ||
          serviceError ||
          countryError ||
          stateError ||
          postalCodeError ||
          cityError ||
          addressError,
      });
    }

    let imagePath = null; // Changed from const to let
    const imageIs = req.body.pfpImage;
    console.log("Image Is:", imageIs);
    // Check if req.file exists (new profile picture uploaded)
    if (req.file) {
      const photoFileName = req.file.filename;
      imagePath = `http://localhost:5000/public/uploads/pfp/${photoFileName}`;
    }

    const updateFields = {
      name,
      email,
      contact,
      address,
      service,
      country,
      city,
      region,
      postalCode,
    };

    // Only add pfpImage to updateFields if imagePath is not null
    if (imagePath !== null) {
      updateFields.pfpImage = imagePath;
    }
    if (imageIs === "null1") {
      updateFields.pfpImage = null;
    }
    const updateProfile = await userModel.update(updateFields, {
      where: { id: id },
    });
    res.send(updateProfile);
  } catch (error) {
    if (error.name === "SequelizeDatabaseError" && error.original) {
      res.status(400).json({
        status: 400,
        data: error,
        message: ` ${error.original}`,
      });
    }
    if (error instanceof Sequelize.UniqueConstraintError) {
      res.status(400).json({
        message: `Email: ${error.errors[0].value} is already registered.`,
      });
    }
    console.error("Error receiving data from decoded token:", error);
  }
};


exports.deleteProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProfile = await userModel.destroy({ where: { id: id } });
    res.sendStatus(200).send(deleteProfile);
    console.log("Profile deleted successfully:", deleteProfile);
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: null,
      message: "Internal server error.",
    });
  }
};
