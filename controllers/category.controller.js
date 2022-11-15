const {
  createCategoryServices,
  getAllCategoriesService,
  getSingleCategoryService,
  updateSingleCategoryService,
} = require("../services/category.services");

exports.createCategory = async (req, res, next) => {
  try {
    const category = await createCategoryServices(req.body);

    res.status(200).json({
      status: "success",
      message: "Category crated successfully",
      result: category,
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: "Data insert failed",
      error: error.message,
    });
  }
};
exports.getAllCategories = async (req, res, next) => {
  try {
    const category = await getAllCategoriesService();

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
exports.getSingleCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await getSingleCategoryService(id);

    if (!category) {
      return res.status(400).json({
        status: "failure",
        error: "Could not find brand with id",
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
exports.updateSingleCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await updateSingleCategoryService(id, req.body);

    if (!category.nModified) {
      return res.status(400).json({
        status: "failure",
        error: "Could not find brand with id",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Category successfully updated",
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: "Data load failed",
      error: error.message,
    });
  }
};
