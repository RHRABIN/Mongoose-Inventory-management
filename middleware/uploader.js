const multer = require("multer");
const path = require("path");

// its use for make file name
const storage = multer.diskStorage({
  destination: "images/",
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, uniqueSuffix + "-" + file.originalname);
  },
});

// main middleware for image require
const uploader = multer({
  storage,
  fileFilter: (req, file, callback) => {
    const supportedImage = /png|jpg/;
    const extension = path.extname(file.originalname);
    if (supportedImage.test(extension)) {
      callback(null, true);
    } else {
      callback(new Error("MUst be a png/jpg image"));
    }
  },

  limits: {
    fileSize: 5000000,
  },
});

module.exports = uploader;
