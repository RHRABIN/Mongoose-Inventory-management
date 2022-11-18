const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")?.[1];
    if (!token) {
      return res.status(401).json({
        status: "failure",
        error: "Your are not logged in",
      });
    }

    const decodedUser = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );

    req.user = decodedUser;
    next();
  } catch (error) {
    res.status(400).json({
      status: "failure",
      error,
    });
  }
};
