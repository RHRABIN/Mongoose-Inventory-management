const Category = require("../models/category");

exports.createCategoryServices = async (data) => {
  const category = await Category.create(data);
  return category;
};
exports.getAllCategoriesService = async () => {
  const categories = await Category.find({});
  return categories;
};
exports.getSingleCategoryService = async (id) => {
  const categories = await Category.findOne({ _id: id });
  return categories;
};
exports.updateSingleCategoryService = async (id, data) => {
  const categories = await Category.updateOne(
    { _id: id },
    { $set: data },
    { runValidators: true }
  );
  return categories;
};
