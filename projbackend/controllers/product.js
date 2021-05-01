const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { IncomingForm } = require("formidable");
const { check, body, validationResult } = require("express-validator");

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

exports.createProduct = (req, res) => {
  const form = IncomingForm(formOptions);
  form.parse(req, async (err, fields, file) => {
    if (err) {
      return res.status(400).json({ message: "Error Creating Product", error: err });
    }

    //Create Product
    let product = await Product.create(fields, (err, product) => {
      if (err) {
        return res.status(400).json({ message: "Error Creating Product", error: err.message });
      }
      return product;
    });

    //Handle image file here
    if (file.photo) {
      if (file.photo.size > 3 * 1024 * 1024) {
        return res.status(400).json({ message: "File Size should be below 3MB" });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;

      product.save((err, product) => {
        if (err) {
          return res.status(400).json({ message: "Error Saving Product Photo details", error: err });
        }
        res.json(product);
      });
    }
  });
};

exports.getProduct = (req, res) => {
  return res.json(req.product);
};
