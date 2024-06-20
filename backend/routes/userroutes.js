const express = require("express");
const router = express.Router();
const userController = require("../controllers/usercontroller");
const verifyToken = require("../middlewares/Verifytoken");
const multer = require("../middlewares/Multer");




router.post("/register" , multer  , userController.register);
router.get("/users"   , userController.users);
router.get("/users/:id"   , userController.usersById);
router.get("/search/:key" , multer  , userController.search);
router.put('/updateProfile' , multer , userController.updateProfile)
router.put('/imageDel/:id' , multer , userController.imageDel)
router.delete('/delete/:id', userController.userDel)


// router.post("/verifyToken", );





module.exports = router