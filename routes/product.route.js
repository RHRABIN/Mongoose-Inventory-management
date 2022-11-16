const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const uploader = require("../middleware/uploader");

router.post(
  "/file-upload",
  uploader.array("image"),
  productController.fileUpload
);
router.route("/bulk-update").patch(productController.bulkUpdateProduct);
router.route("/bulk-delete").delete(productController.bulkDelete);

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.postProduct);

// all dynamic route declare under other routes
router
  .route("/:id")
  .get(productController.getSingleProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProductById);

// module exports router
module.exports = router;
