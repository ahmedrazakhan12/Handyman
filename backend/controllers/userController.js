const db = require("../models/index");
require("dotenv").config();
const bcrypt = require("bcryptjs"); // Import bcryptjs for password hashing
const userModel = db.userModel;
const { Sequelize } = require("sequelize"); // Import Sequelize
const {
  // validateAllfields,
  validateName,
  validateEmail,
  validateContact,
  validatePassword,
  validateAddress,

} = require("../middlewares/Validate");
exports.register = async (req, res) => {
  try {
    const { name, email, password, contact, address, status, confirmPassword } =
      req.body;

    // console.log("Formdata:", name, email, password, contact, address, status);

    // const validateAllfieldError = validateAllfields({
    //   name,
    //   email,
    //   contact,
    //   status,
    //   address,
    //   password,
    //   confirmPassword,
    // });
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const contactError = validateContact(contact);
    const passwordError = validatePassword(password, confirmPassword);
  const addressError = validateAddress(address);
    if (nameError || emailError || contactError || passwordError || addressError) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: nameError || emailError || contactError || passwordError  || addressError,
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

    // res.status(500).json({
    //   status: 500,
    //   data: error,
    //   message: "server error.",
    // });
    // res.status(500).json({
    //   status: 500,
    //   data: null,
    //   message: "Internal server error.",
    // });
  }
};
exports.users = async (req, res) => {
  try {
    const users = await userModel.findAll({
      order: [["id", "ASC"]],
      where: {
        status: "user",
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

exports.search = async (req, res) => {
  try {
    const { key } = req.params;
    const users = await userModel.findAll({
      where: {
        status: "user",
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
    const { id, username, email, contact, address } = req.body;
    const nameError = validateName(username);
    const emailError = validateEmail(email);
    const contactError = validateContact(contact);
    const addressError = validateAddress(address);

    if (nameError || emailError || contactError || addressError) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: nameError || emailError || contactError || addressError,
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

    const updateProfile = async (
      id,
      name,
      email,
      contact,
      address,
      pfpImage
    ) => {
      const updateFields = { name, email, contact, address };

      // Only add pfpImage to updateFields if imagePath is not null
      if (pfpImage !== null) {
        updateFields.pfpImage = pfpImage;
      }
      // Handle special case where imageIs === "empty"
      if (imageIs === "empty") {
        updateFields.pfpImage = null;
      }
      return await userModel.update(updateFields, { where: { id: id } });
    };

    // Call updateProfile to update user profile with the received data
    await updateProfile(id, username, email, contact, address, imagePath);
    console.log("Profile Updated");
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    if (error.name === "SequelizeDatabaseError" && error.original) {
      res.status(400).json({
        status: 400,
        data: error,
        message: `Value too long`,
      });
      return; // Stop further execution
    } else if (error instanceof Sequelize.UniqueConstraintError) {
      res.status(400).json({
        message: `Email: ${error.errors[0].value} is already registered.`,
      });
      return; // Stop further execution
    }

    console.error("Error receiving data from decoded token:", error);
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

// if (password !== confirmPassword) {
//   return res.status(400).json({
//     status: 400,
//     data: null,
//     message: "Passwords do not match.",
//   });
// }

// const minLength = 8;
// const maxLength = 20;
// const hasUpperCase = /[A-Z]/.test(password);
// const hasLowerCase = /[a-z]/.test(password);
// const hasNumbers = /\d/.test(password);
// const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

// // Validation logic
// if (!password) {
//   return res
//     .status(400)
//     .json({ status: 400, data: null, message: "Password is required." });
// }

// if (password.length < minLength || password.length > maxLength) {
//   return res.status(400).json({
//     status: 400,
//     data: null,
//     message: `Password must be between ${minLength} and ${maxLength} characters.`,
//   });
// }

// if (!(hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars)) {
//   return res.status(400).json({
//     status: 400,
//     data: null,
//     message:
//       "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
//   });
// }

// const nameMinLength = 3;
// const nameMaxLength = 20;

// if (name.length < nameMinLength || name.length > nameMaxLength) {
//   return res.status(400).json({
//     status: 400,
//     data: null,
//     message: `Name must be between ${nameMinLength} and ${nameMaxLength} characters.`,
//   });
// }

// const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// if (!emailPattern.test(email)) {
//   return res
//     .status(400)
//     .json({ status: 400, data: null, message: "Invalid email format." });
// }
// const contactPattern = /^\d{10}$/; // Assuming 10-digit phone number format

// if (contact && !contactPattern.test(contact)) {
//   return res.status(400).json({
//     message:
//       "Invalid contact number format. It should be a 10-digit number.",
//   });
// }
