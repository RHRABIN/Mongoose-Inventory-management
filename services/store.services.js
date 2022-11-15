const Store = require("../models/Store");

exports.createStoreService = async (data) => {
  const store = await Store.create(data);
  return store;
};
exports.getAllStoresService = async () => {
  const stores = await Store.find({});
  return stores;
};
exports.getSingleStoreService = async (id) => {
  const store = await Store.findOne({ _id: id });
  return store;
};
exports.updateSingleStoreService = async (id, data) => {
  const stores = await Store.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return stores;
};
