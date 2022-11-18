const User = require("../models/user");

exports.signupService = async (userInfo) => {
  const user = await User.create(userInfo);
  return user;
};
exports.getAllUsersService = async () => {
  const user = await User.find({});
  return user;
};
exports.findUserByEmailService = async (email) => {
  const user = await User.findOne({ email: email });
  return user;
};
