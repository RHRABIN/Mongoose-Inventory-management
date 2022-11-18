const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: [validator.isEmail, "Provide a valid email"],
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 6,
            minLowerCase: 3,
            minNumber: 1,
            minUpperCase: 1,
            minSymbol: 1,
          }),
        message: "Password {VALUE} is not strong enough to",
      },
    },
    confirmPassword: {
      type: String,
      required: [true, "Confirm Password is required"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Password don't match",
      },
    },

    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minLength: [3, "First name must be at least 3 characters long"],
      maxLength: [100, "Name must be at most 100 characters long"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minLength: [3, "First name must be at least 3 characters long"],
      maxLength: [100, "Last name must be at most 100 characters long"],
    },
    contactNumber: {
      type: String,
      validate: [validator.isMobilePhone, "Please enter a valid mobile number"],
    },
    shippingAddress: String,
    imageUrl: {
      type: String,
      validate: [validator.isURL, "Please enter a valid image URL"],
    },
    status: {
      type: String,
      enum: ["active", "in-active", "blocked"],
      default: "active",
    },
    role: {
      type: String,
      enum: ["buyer", "store-manger", "admin"],
      default: "buyer",
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const password = this.password;
  const hasPassword = bcrypt.hashSync(password);
  this.password = hasPassword;
  this.confirmPassword = undefined; // not save on database
  next();
});

userSchema.methods.comparePassword = function (password, has) {
  const isPasswordValid = bcrypt.compareSync(password, has);
  return isPasswordValid;
};

const User = mongoose.model("Model", userSchema);

module.exports = User;
