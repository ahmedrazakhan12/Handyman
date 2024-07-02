const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admincontroller");
const verifyToken = require("../middlewares/Verifytoken");
const multer = require("../middlewares/Multer");

router.post("/login", adminController.userLogin);
router.get("/decodedToken", verifyToken, adminController.adminData);
router.get("/adminInfo", adminController.adminInfo);
router.put("/editProfile", multer, adminController.editPfp);
router.post("/register", multer , adminController.register);
router.put("/changePassword", adminController.changePassword);
router.get("/team", adminController.team);
router.get("/team/:id", adminController.teamDataById);
router.delete("/team/delete/:id", adminController.adminDelete);
router.put("/changeAdminPassword/:id", adminController.changeAdminPassword);
router.get("/search/:key", adminController.adminSearch);
// router.put("/imageDel/:id"  , adminController.imageDel);

// router.post("/verifyToken", );

module.exports = router;
