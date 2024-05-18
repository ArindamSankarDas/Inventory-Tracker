const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const verifyJWT = require("../middleware/verifyJwt");

router.use(verifyJWT);

router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createProduct)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct)
  .patch(productController.decreaseProductCount);

module.exports = router;
