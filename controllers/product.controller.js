const {
  getProductsService,
  createProductService,
  updateProductService,
  bulkUpdateProductService,
  deleteProductById,
  bulkDeleteService,
} = require("../services/product.services");

exports.getProducts = async (req, res, next) => {
  try {
    let filters = { ...req.query };

    // sort, page, limit
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    // gt, lt, gte, lte
    let filterString = JSON.stringify(filters);
    filterString = filterString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    filters = JSON.parse(filterString);

    // queries for products
    const queries = {};
    if (req.query.sort) {
      const sort = req.query.sort.split(",").join(" ");
      queries.sortBy = sort;
    }

    if (req.query.fields) {
      const field = req.query.fields.split(",").join(" ");
      queries.fields = field;
    }

    // page calculation
    if (req.query.page) {
      const { page = 1, limit = 2 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const products = await getProductsService(filters, queries);

    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail to load",
      message: "can't load data",
      error: error.message,
    });
  }
};

exports.postProduct = async (req, res, next) => {
  // data insert for two way one is save another is create

  //data insert by using create method

  try {
    const result = await createProductService(req.body);

    // data insert by using save (instance creation => do something => save () )

    // const product = new Product(req.body); // this is called instance creation

    // const result = await product.save();

    res.status(200).json({
      status: "success",
      message: "Product successfully created",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: "Data insert failed",
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await updateProductService(id, req.body);

    res.status(200).json({
      status: "success",
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: "Data insert failed",
      error: error.message,
    });
  }
};

exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    const result = await bulkUpdateProductService(req.body);

    res.status(200).json({
      status: "success",
      message: "Products updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: "Data insert failed",
      error: error.message,
    });
  }
};

exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteProductById(id);

    if (!result.deletedCount) {
      return res.status(400).json({
        status: "failure",
        error: "could not delete product",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Products delete successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: "Data delete failed",
      error: error.message,
    });
  }
};

exports.bulkDelete = async (req, res, next) => {
  try {
    const result = await bulkDeleteService(req.body.ids);

    res.status(200).json({
      status: "success",
      message: "Products delete successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: "Data delete failed",
      error: error.message,
    });
  }
};
