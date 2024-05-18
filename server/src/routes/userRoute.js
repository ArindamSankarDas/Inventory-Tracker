const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

const verifyJWT = require("../middleware/verifyJwt");

router.use(verifyJWT);

router
  .route("/")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
