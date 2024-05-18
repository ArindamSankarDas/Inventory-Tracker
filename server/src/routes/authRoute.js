const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router
  .route("/register")
  .post(authController.handleRegister, authController.handleLogin);

router.route("/login").post(authController.handleLogin);

router.route("/refresh").get(authController.handleRefresh);

router.route("/logout").post(authController.handleLogout);

module.exports = router;
