const express = require("express");
const userController = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/me", verifyToken, userController.getMe);

router.post("/signup", userController.signup);
router.post("/login", userController.login);

module.exports = router;
