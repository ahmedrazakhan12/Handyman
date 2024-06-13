const express = require("express");
const router = express.Router();
const userController = require("../controllers/usercontroller");
const verifyToken = require("../middlewares/Verifytoken");
const multer = require("../middlewares/Multer");




router.post("/login" , userController.userLogin);
router.get("/decodedToken" , verifyToken , userController.adminData);
router.get("/adminInfo" , userController.adminInfo);
router.put("/editProfile" , multer , userController.editPfp);

// router.post("/verifyToken", );





module.exports = router