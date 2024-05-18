const express = require("express");
const router = express.Router();

const transactionController = require("../controllers/transactionController");
const verifyJWT = require("../middleware/verifyJwt");

router.use(verifyJWT);

router
  .route("/")
  .get(transactionController.getAllTransactions)
  .post(transactionController.initiateNewTransaction);

module.exports = router;
