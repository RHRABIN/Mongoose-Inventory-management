const {
  signupService,
  getAllUsersService,
  findUserByEmailService,
  deleteUserByEmailService,
  findUserByTokenService,
} = require("../services/user.services");
const { sendMailWithMailGun } = require("../utils/email");
const { generateToken } = require("../utils/token");

exports.signup = async (req, res, next) => {
  try {
    const user = await signupService(req.body);
    const token = user.generateConfirmationToken();
    await user.save({ validateBeforeSave: false });

    const mailData = {
      to: [user.email],
      subject: "Verify your account",
      text: `Thank you for registering. Please click this link to confirm your account: ${
        req.protocol
      }://${req.get("host")}${req.originalUrl}/confirmation/${token}`,
    };

    sendMailWithMailGun(mailData);

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
  console.log(req.ip);

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
exports.deleteUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const result = await deleteUserByEmailService(email);

    if (result.deletedCount == 0) {
      return res.status(401).json({
        status: "failure",
        message: " user not found",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "failure",
      error,
    });
  }
};
exports.confirmationEmail = async (req, res, next) => {
  try {
    const { token } = req.params;
    const user = await findUserByTokenService(token);
    console.log(user);

    if (!user) {
      res.status(403).json({
        status: "failure",
        error: "Invalid your token",
      });
    }

    const expired = new Date() > new Date(user.expiredTokenDate);
    if (expired) {
      return res.status(401).json({
        status: "failure",
        error: "Token is expired",
      });
    }

    user.status = "active";
    user.confirmationToken = undefined;
    user.expiredTokenDate = undefined;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "Success",
      message: "Successfully activated your account",
    });
  } catch (error) {
    res.status(500).json({
      message: "failure",
      error,
    });
  }
};
