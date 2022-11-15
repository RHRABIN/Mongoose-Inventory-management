const express = require("express");
const router = express.Router();
const storeController = require("../controllers/store.controller");

router
  .route("/")
  .get(storeController.getAllStores)
  .post(storeController.createStore);

router
  .route("/:id")
  .get(storeController.getSingleStore)
  .patch(storeController.updateSingleStore);

module.exports = router;
