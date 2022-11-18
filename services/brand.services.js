const Brand = require("../models/Brand");

exports.createBrandServices = async (data) => {
  const result = await Brand.create(data);
  return result;
};
exports.getBrandsServices = async () => {
  const brands = await Brand.find({});
  return brands;
};
exports.getBrandServices = async (id) => {
  const brand = await Brand.findOne({ _id: id });
  return brand;
};
exports.updateBrandServices = async (id, data) => {
  const brand = await Brand.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return brand;
};
