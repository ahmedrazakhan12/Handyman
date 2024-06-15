const express = require("express");
const router = express.Router();
const userController = require("../controllers/usercontroller");
const verifyToken = require("../middlewares/Verifytoken");
const multer = require("../middlewares/Multer");




router.post("/login" , userController.userLogin);
router.get("/decodedToken" , verifyToken , userController.adminData);
router.get("/adminInfo" , userController.adminInfo);
router.put("/editProfile" , multer , userController.editPfp);
router.post("/register"  , userController.register);
router.put("/changePassword"  , userController.changePassword);
router.get("/team" , userController.team);
router.get("/team/:id" , userController.teamDataById);
router.delete("/team/delete/:id" , userController.adminDelete);
router.put("/changeAdminPassword/:id"  , userController.changeAdminPassword);



// router.post("/verifyToken", );





module.exports = router