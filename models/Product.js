const mongoose = require("mongoose");

//schema design
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a nem for this product"],
      trim: true,
      unique: [true, "Name must be unique"],
      lowercase: true,
      minLength: [3, "Name must be al least 3 characters"],
      maxLength: [100, "Name is large"],
    },

    description: {
      type: String,
      required: [true, "Please provide a description for this product"],
    },

    unit: {
      type: String,
      required: [true, "Please provide a unit for this product"],
      // enum: ["kg", "litre", "pcs"],
      enum: {
        values: ["kg", "litre", "pcs", "bag"],
        message: "unit value can't be {VALUE}, must be /kg/litre/pcs/bag",
      },
    },
    imageURLs: [
      {
        type: String,
        required: true,
        validate: {
          validator: (value) => {
            if (!Array.isArray(value)) {
              return false;
            }
            let isValidate = true;
            value.forEach((url) => {
              if (!validator.isURL(url)) {
                isValidate = false;
              }
            });
            return isValidate;
          },
          message: "Please Provide an image url for this product",
        },
      },
    ],
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },

    category: {
      type: String,
      required: true,
    },

    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// schema => model => query

// product model convention it's name start capital letter and model("model name", Which schema depend )
const Product = new mongoose.model("Product", productSchema);

module.exports = Product;
