const {
  signupService,
  getAllUsersService,
  findUserByEmailService,
} = require("../services/user.services");
const { generateToken } = require("../utils/token");

exports.signup = async (req, res, next) => {
  try {
    const user = await signupService(req.body);

    res.status(200).json({
      status: "Success",
      message: "Successfully signed up",
    });
  } catch (error) {
    res.status(500).json({
      message: "failure",
      error,
    });
  }
};
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();

    res.status(200).json({
      status: "Success",
      users: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "failure",
      error,
    });
  }
};

/// user login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // step 1: if email or password do not enter
    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        error: "Please provide your credentials",
      });
    }

    // step 2: load user by email
    const user = await findUserByEmailService(email);

    // step 3: if user not exist then return error
    if (!user) {
      res.status(401).json({
        status: "fail",
        error: "No user with that email",
      });
    }

    // step 4: if user password is not correct then return
    // const isPasswordValid = bcrypt.compareSync(password, user.password);
    const isPasswordValid = user.comparePassword(password, user.password);

    // step 5: if password is not correct then return
    if (!isPasswordValid) {
      return res.status(403).json({
        status: "failure",
        error: "Email or password is not correct",
      });
    }

    // step 6: if user is not active (status)
    if (user.status != "active") {
      return res.status(401).json({
        status: "failure",
        message: "Your account is not active",
      });
    }

    const token = generateToken(user);
    const { password: pwd, ...others } = user.toObject();

    res.status(200).json({
      status: "Success",
      message: "Successfully signed up",
      data: {
        user: others,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "failure",
      error,
    });
  }
};

exports.getMe = async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({
      message: "failure",
      error,
    });
  }
};
