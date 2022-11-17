const Supplier = require("../models/supplier");

exports.createSupplierServices = async (data) => {
  const result = await Supplier.create(data);
  return result;
};
exports.getSuppliersServices = async () => {
  const brands = await Supplier.find({});
  return brands;
};
exports.getSupplierServices = async (id) => {
  const brand = await Supplier.findOne({ _id: id });
  return brand;
};
exports.updateSupplierServices = async (id, data) => {
  const brand = await Supplier.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return brand;
};
