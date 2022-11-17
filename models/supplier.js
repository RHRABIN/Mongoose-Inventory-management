const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const supplierSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      localStorage: true,
      minLength: [3, "Name must be at least 3 characters long"],
      maxLength: [100, "Name must be at most 100 characters long"],
    },
    email: {
      type: String,
      validate: [validator.isEmail, "Provide a valid email address"],
      trim: true,
      localStorage: true,
      unique: true,
    },
    brand: {
      name: {
        type: String,
        trim: true,
        required: true,
      },
      id: {
        type: ObjectId,
        required: true,
        ref: "Brand",
      },
    },
    contactNumber: [
      {
        type: String,
        required: [true, "Please provide a contact number"],
        validate: {
          validator: (value) => {
            return validator.isMobilePhone(value);
          },
          message: "Please provide a valid contact number",
        },
      },
    ],
    emergencyContactNumber: [
      {
        type: String,
        required: [true, "Please provide a emergency contact number"],
        validate: {
          validator: (value) => {
            return validator.isMobilePhone(value);
          },
          message: "Please provide a valid emergency contact number",
        },
      },
    ],

    tradeLicenceNumber: {
      type: String,
      required: [true, "Please provide a trade licence number"],
    },
    presentAddress: {
      type: String,
      required: [true, "Please provide a present address"],
    },
    permanentAddress: {
      type: String,
      required: [true, "Please provide a present permanentAddress"],
    },
    location: {
      type: String,
      required: true,
      lowercase: true,
      enum: {
        values: [
          "dhaka",
          "chattogram",
          "rajshahi",
          "sylhet",
          "khulna",
          "barishal",
          "rangpur",
          "mymensingh",
        ],
        message: "Please provide a valid address",
      },
    },
    imageURL: {
      type: String,
      validate: [validator.isURL, "Please provide a valid image URL"],
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive"],
    },
  },
  { timestamp: true }
);
