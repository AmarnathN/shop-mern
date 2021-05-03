const { check, body, validationResult } = require("express-validator");
const Category = require("../models/category");
const Product = require("../models/product");

const validateCategory = async (category, { req, res }) => {
  await Category.findById(category)
    .exec()
    .then(async (category, err) => {
      if (err) {
        return Promise.reject({ err });
      }
      if (!category) {
        return Promise.reject("Given category not found");
      }
      productsOfCategory = await Product.findOne({ category: category, name: req.body.name });
      if (productsOfCategory) {
        return Promise.reject("Given category has same named product");
      }
    });
};

exports.productValidationRules = (req, res) => {
  return [
    check("name", "Name length should be min 3 characters").isLength({ min: 3 }),
    check("price").exists().isNumeric().withMessage("Only Numeric values allowed"),
    check("category").custom(validateCategory),
  ];
};
