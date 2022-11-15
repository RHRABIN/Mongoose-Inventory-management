const express = require("express");
const { route } = require("../app");
const router = express.Router();
const categoryController = require("../controllers/category.controller");

router
  .route("/")
  .get(categoryController.getAllCategories)
  .post(categoryController.createCategory);

router.route("/:id").get(categoryController.getSingleCategory);
router.route("/:id").patch(categoryController.updateSingleCategory);

module.exports = router;
