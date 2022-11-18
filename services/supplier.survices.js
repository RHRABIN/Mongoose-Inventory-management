const Supplier = require("../models/supplier");

exports.createSupplierServices = async (data) => {
  const result = await Supplier.create(data);
  return result;
};
exports.getSuppliersServices = async () => {
  const brand = await Supplier.find({});
  return brand;
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
