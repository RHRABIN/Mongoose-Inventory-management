const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

const categoryModel = mongoose.model(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Please provide a category name"],
      trim: true,
      lowercase: true,
    },
    description: String,
    imageUrl: {
      type: String,
      validate: [validator.isURL, "Please enter a valid url address"],
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categoryModel);
module.exports = Category;
