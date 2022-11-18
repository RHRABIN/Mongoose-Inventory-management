//

module.exports = (...role) => {
  // jeheto amra authorization er jonnw route a ekta function declare korbo without middleware so ei function ta ekta middleware return korbe

  return (req, res, next) => {
    const userRole = req.user.role;
    if (!role.includes(userRole)) {
      return res.status(403).json({
        status: "failure",
        message: "Your are not authorized for this",
      });
    }
    next();
  };
};
