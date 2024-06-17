const express = require("express");
const router = express.Router();
const userController = require("../controllers/usercontroller");
const verifyToken = require("../middlewares/Verifytoken");
const multer = require("../middlewares/Multer");




router.post("/register" , multer  , userController.register);
router.get("/users" , multer  , userController.users);



// router.post("/verifyToken", );





module.exports = router