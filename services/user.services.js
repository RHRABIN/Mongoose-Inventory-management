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
exports.deleteUserByEmailService = async (email) => {
  const user = await User.deleteOne({ email: email });
  return user;
};
exports.findUserByTokenService = async (token) => {
  const user = await User.findOne({ confirmationToken: token });
  return user;
};
