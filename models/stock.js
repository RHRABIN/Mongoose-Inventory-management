const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

//schema design
const stockSchema = mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      required: true,
      ref: "Product",
    },

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
    imageUrls: [
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
    price: {
      type: Number,
      required: true,
      min: [0, "Product price can't be less than 0"],
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity price can't be less than 0"],
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
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },
    status: {
      type: String,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "Please select a status",
      },
    },
    store: {
      name: {
        type: String,
        trim: true,
        required: [true, "Please enter a name"],
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
          message: "{VALUE} is not a valid",
        },
      },
      id: {
        type: ObjectId,
        required: true,
        ref: "Store",
      },
    },
    suppliedBy: {
      name: {
        type: String,
        trim: true,
        required: [true, "Please enter a supplier name"],
      },
      id: {
        type: ObjectId,
        ref: "Supplier",
      },
    },
  },
  {
    timestamps: true,
  }
);

// schema => model => query

// product model convention it's name start capital letter and model("model name", Which schema depend )
const Stock = new mongoose.model("Stock", stockSchema);

module.exports = Stock;
