const Product = require("../models/product");
const { s3FileUpload, s3FileDelete } = require("../services/s3fileHandling.js");
const { PRODUCT_IMAGES_PATH, DEFAULT_QUERY_PAGE_LIMIT } = require("../constants/projectConstants");
const { sortBy } = require("lodash");

const formOptions = {
  keepExtensions: true,
  maxFileSize: 20 * 1024 * 1024, // 20mb
};

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((error, product) => {
      if (error) {
        return res.status(400).json({ message: "Error finding the product ", error: error });
      }
      if (!product) {
        return res.status(404).json({ message: "No product found " });
      }
      req.product = product;
      next();
    });
};

exports.getAllProducts = (req, res) => {
  let limit = parseInt(req.query.limit) || DEFAULT_QUERY_PAGE_LIMIT;
  let sortBy = req.query.sortBy || "updatedAt";
  Product.find()
    .sort([[sortBy, -1]])
    .limit(limit)
    .exec((error, products) => {
      if (error) {
        return res.status(400).json({ message: "Error finding Products", error: error });
      }
      if (products.length == 0) {
        return res.status(404).json({ message: "No Products found" });
      }
      res.json(products);
    });
};

exports.createProduct = async (req, res) => {
  try {
    if (req.file) {
      req.filePathPrefix = PRODUCT_IMAGES_PATH;
      file = await s3FileUpload(req, res)
        .then((file) => {
          return file;
        })
        .catch((error) => {
          res.json({ message: "Error occured while trying to upload to S3 bucket", error });
        });
      req.body.image = file.Location;
    }
    console.log(req.body);
    let newProduct = new Product(req.body);
    newProduct
      .save()
      .then((product) => {
        res.json(product);
      })
      .catch((error) => {
        res.status(422).json({ message: "Error occured while trying to save to DB", error: error.message });
      });
  } catch (error) {
    res.status(500).json({ message: "Error occured while trying to save to DB", error: error.message });
  }
};

exports.getProduct = (req, res) => {
  return res.json(req.product);
};

exports.updateProduct = async (req, res) => {
  try {
    if (req.file) {
      req.filePathPrefix = PRODUCT_IMAGES_PATH;
      let file = await s3FileUpload(req, res)
        .then((file) => {
          return file;
        })
        .catch((error) => {
          res.json({ message: "Error occured while trying to upload to S3 bucket", error });
        });
      // this is to delete the old linked file from S3
      req.deleteFileName = req.product.image;
      if (req.deleteFileName) {
        await s3FileDelete(req, res)
          .then()
          .catch((error) => {
            res.json({ message: "Error occured while trying to deleting file from S3 bucket", error });
          });
      }
      req.body.image = file.Location;
    }

    Product.findOneAndUpdate({ _id: req.product._id }, { $set: req.body }, { useFindAndModify: false, new: true })
      .then((product) => {
        res.json(product);
      })
      .catch((error) => {
        res.status(422).json({ message: "Error occured while trying to Update Product in DB", error: error.message });
      });
  } catch (error) {
    res.status(500).json({ message: "Error occured while trying to Update Product in DB", error: error.message });
  }
};

exports.deleteProduct = (req, res) => {
  req.filePathPrefix = PRODUCT_IMAGES_PATH;

  Product.deleteOne({ _id: req.product._id }, (error, product) => {
    if (error) {
      return res.status(400).json({ message: "Error deleting product", error: error });
    }
    req.deleteFileName = req.product.image;
    if (req.deleteFileName) {
      s3FileDelete(req, res)
        .then((file) => {
          res.json({ message: "Deleted the Product", product: req.product });
        })
        .catch((error) => {
          res.json({ message: "Error occured while trying to delete product from S3 bucket", error });
        });
    }
  });
};

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.orderItems.map((product) => {
    return {
      updateOne: {
        filter: { _id: product._id },
        update: { $inc: { stock: -product.count, sold_units: +product.count } },
      },
    };
  });
  Product.bulkWrite(myOperations, {}, (error, products) => {
    if (error) {
      return res.status(400).json({ message: "Error in bulk writing the product", error: error });
    }
    next();
  });
};
