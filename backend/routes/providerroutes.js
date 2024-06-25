const express = require("express");
const router = express.Router();
const providerController = require("../controllers/providercontroller");
const verifyToken = require("../middlewares/Verifytoken");
const multer = require("../middlewares/Multer");




router.post("/register" , multer  , providerController.register);
router.get("/providers" , multer  , providerController.getProviders);
router.get("/providers/:id"  , providerController.getProvidersById);
router.get("/search/:key" , multer  , providerController.search);

// router.post("/verifyToken", );





module.exports = router