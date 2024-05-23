const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

const loginLimiter = require("../middleware/loginLimiter");

router
  .route("/register")
  .post(authController.handleRegister, authController.handleLogin);

router.route("/login").post(loginLimiter,authController.handleLogin);

router.route("/refresh").get(authController.handleRefresh);

router.route("/logout").post(authController.handleLogout);

module.exports = router;
