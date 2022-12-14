const Product = require("../models/Product");
const Brand = require("../models/Brand");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.getProductsService = async (filters, queries) => {
  const product = await Product.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  const totalProducts = await Product.countDocuments(filters);
  const pageCount = Math.ceil(totalProducts / queries.limit);
  return { totalProducts, pageCount, product };
};

exports.getSingleProductService = async (id) => {
  // const product = await Product.findOne({ _id: id });

  const product = await Product.aggregate([
    // stage one
    { $match: { _id: ObjectId(id) } },
    {
      $project: {
        name: 1,
        unit: 1,
        category: 1,
        "brand.name": { $toLower: "$brand.name" },
      },
    },
    {
      $lookup: {
        from: "brands",
        localField: "brand.name",
        foreignField: "name",
        as: "brandDetails",
      },
    },
  ]);

  return product;
};

exports.createProductService = async (data) => {
  const product = await Product.create(data);
  const { _id: productId, brand } = product;
  const res = await Brand.updateOne(
    { _id: brand.id },
    { $push: { products: productId } }
  );
  console.log(res);
  return product;
};

exports.updateProductService = async (productId, data) => {
  // const result = await Product.updateOne(
  //   { _id: productId },
  //   { $set: data },
  //   { runValidators: true }
  // );

  // const result = await Product.updateOne(
  //   { _id: productId },
  //   { $inc: data },
  //   { runValidators: true }
  // );

  const product = await Product.findById(productId);
  const result = await product.set(data).save();

  return result;
};

exports.bulkUpdateProductService = async (data) => {
  const result = await Product.updateMany({}, data, {
    runValidators: true,
  });

  // const products = [];
  // data.ids.forEach((product) => {
  //   products.push(Product.updateOne({ _id: product.id }, product.data));
  // });

  // const result = await Promise.all(products);

  return result;
};

exports.deleteProductById = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

exports.bulkDeleteService = async (ids) => {
  const result = await Product.deleteMany({});
  return result;
};
