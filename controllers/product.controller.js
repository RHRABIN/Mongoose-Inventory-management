const Product = require("../models/Product");
const {
  getProductsService,
  createProductService,
} = require("../services/product.services");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await getProductsService();

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
