const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(express.json());
app.use(cors());

const productRoute = require("./routes/product.route");
const brandRoute = require("./routes/brand.route");
const categoryRoute = require("./routes/category.route");
const storeRoute = require("./routes/store.route");

// root route
app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

//posting to database
app.use("/api/v1/product", productRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/store", storeRoute);

module.exports = app;
