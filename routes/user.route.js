const express = require("express");
const userController = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/me", verifyToken, userController.getMe);
router.get("/signup/confirmation/:token", userController.confirmationEmail);

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.delete("/delete/:email", userController.deleteUserByEmail);

module.exports = router;
