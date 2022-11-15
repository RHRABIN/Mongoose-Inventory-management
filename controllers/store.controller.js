const {
  createStoreService,
  getAllStoresService,
  getSingleStoreService,
  updateSingleStoreService,
} = require("../services/store.services");

exports.createStore = async (req, res, next) => {
  try {
    const store = await createStoreService(req.body);

    res.status(200).json({
      status: "success",
      message: "Store created successfully",
      result: store,
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: "Data insert failed",
      error: error.message,
    });
  }
};
exports.getAllStores = async (req, res, next) => {
  try {
    const store = await getAllStoresService();

    res.status(200).json({
      status: "success",
      result: store,
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: "Data get failed",
      error: error.message,
    });
  }
};

exports.getSingleStore = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await getSingleStoreService(id);

    if (!category) {
      return res.status(400).json({
        status: "failure",
        error: "Could not find store with id",
      });
    }

    res.status(200).json({
      status: "success",
      result: category,
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: "Data load failed",
      error: error.message,
    });
  }
};
exports.updateSingleStore = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await updateSingleStoreService(id, req.body);

    if (!category.nModified) {
      return res.status(400).json({
        status: "failure",
        error: "Could not update store with id",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Store successfully updated",
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: "Data load failed",
      error: error.message,
    });
  }
};
