const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const privateKey = process.env.PRIVATE_KEY;
exports.userLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await userModel.login(email, password);

    if (user && user.password === password) {
      console.log("Password matched. Successfully logged in!");
    const token =  jwt.sign({ payload: user }, privateKey );
    console.log("Token:", token);
      res.status(200).json({
        status: 200,
        data:[user.id , user.email],
        token : token,
        message: "User logged in successfully"
      });
    } else {
      console.log("Password does not match!");
      res.status(400).json({
        status: 400,
        data: null,
        message: "Invalid Credentials."
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: 500,
      data: null,
      message: "Internal server error."
    });
  }
};
