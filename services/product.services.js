const Product = require("../models/Product");

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

exports.createProductService = async (data) => {
  const product = await Product.create(data);
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
