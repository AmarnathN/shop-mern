const Product = require("../models/product");
const s3FileUpload = require("../services/fileUpload");

const formOptions = {
  keepExtensions: true,
  maxFileSize: 20 * 1024 * 1024, // 20mb
};

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({ message: "Error finding the product ", error: err });
      }
      if (!product) {
        return res.status(404).json({ message: "No product found " });
      }
      req.product = product;
      next();
    });
};

exports.getAllProducts = (req, res) => {
  Product.find().exec((err, products) => {
    if (err) {
      return res.status(400).json({ message: "Error finding Products", error: err });
    }
    if (products.length == 0) {
      return res.status(404).json({ message: "No Products found" });
    }
    res.json(products);
  });
};

exports.createProduct = async (req, res) => {
  let file = await s3FileUpload(req, res)
    .then((file) => {
      return file;
    })
    .catch((err) => {
      res.json({ message: "Error occured while trying to upload to S3 bucket", err });
    });
  try {
    if (file) {
      const locationUrl = file.Location;
      let newProduct = new Product({ ...req.body, image: locationUrl });
      newProduct
        .save()
        .then((product) => {
          res.json(product);
        })
        .catch((err) => {
          res.status(422).json({ message: "Error occured while trying to save to DB", err: err.message });
        });
    }
  } catch (err) {
    res.status(500).json({ message: "Error occured while trying to save to DB", err: err.message });
  }
};

exports.getProduct = (req, res) => {
  req.product.image = undefined;
  return res.json(req.product);
};

exports.getProduct;
