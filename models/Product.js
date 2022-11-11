const mongoose = require("mongoose");

//schema design
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a nem for this product"],
      trim: true,
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be al least 3 characters"],
      maxLength: [100, "Name is large"],
    },

    description: {
      type: String,
      required: [true, "Please provide a description for this product"],
    },

    price: {
      type: Number,
      required: [true, "Please provide a price for this product"],
      min: [0, "Price can't be negative"],
    },

    unit: {
      type: String,
      required: [true, "Please provide a unit for this product"],
      // enum: ["kg", "litre", "pcs"],
      enum: {
        values: ["kg", "litre", "pcs"],
        message: "unit value can't be {VALUE}, must be /kg/litre/pcs",
      },
    },

    quantity: {
      type: Number,
      required: [true, "Please provide a quantity for this product"],
      min: [0, "Quantity can't be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: "Quantity must be an integer",
    },

    status: {
      type: String,
      required: [true, "Please provide a status for this product"],
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "status value can't be {VALUE}",
      },
    },

    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },

    // categories: [
    //   {
    //     name: {
    //       type: String,
    //       required: [true, "Please provide a category for this product"],
    //     },
    //     _id: mongoose.Schema.Types.ObjectId,
    //   },
    // ],
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },

    // updatedAt: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  {
    timestamps: true,
  }
);

productSchema.pre("save", function (next) {
  if (this.quantity == 0) {
    this.status = "out-of-stock";
  }

  next();
});

// productSchema.post("save", function (doc, next) {
//   console.log("After saving");

//   next();
// });

productSchema.methods.logger = function () {
  console.log(`Instance is called by logger${this.name}`);
};

// schema => model => query

// product model convention it's name start capital letter and model("model name", Which schema depend )
const Product = new mongoose.model("Product", productSchema);

module.exports = Product;
