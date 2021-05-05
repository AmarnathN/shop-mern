const { DEFAULT_QUERY_PAGE_LIMIT } = require("../constants/projectConstants");
const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (!category) {
      return res.status(404).json({ error: "No category found" });
    }
    if (err) {
      return res.status(400).json({ message: "Error in finding category", error: err });
    }
    req.category = category;
    next();
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategories = (req, res) => {
  let limit = parseInt(req.query.limit) || DEFAULT_QUERY_PAGE_LIMIT;
  let sortBy = req.query.sortBy || "updatedAt";
  Category.find()
    .sort([[sortBy, -1]])
    .limit(limit)
    .exec((err, categories) => {
      if (err || categories.length == 0) {
        return res.status(404).json({ error: "No categories found" });
      }
      res.json(categories);
    });
};

exports.createCategory = (req, res) => {
  Category.create(req.body, (err, category) => {
    if (err) {
      return res.status(400).json({ message: "Unable to create category", error: err });
    }
    res.json(category);
  });
};

exports.updateCategory = (req, res) => {
  Category.findOneAndUpdate({ _id: req.category._id }, { $set: req.body }, { new: true }, (err, category) => {
    if (err) {
      return res.status(400).json({ error: "unable to update Category info" });
    }
    res.json(category);
  });
};

exports.deleteCategory = (req, res) => {
  Category.deleteOne({ _id: req.category._id }, (err, category) => {
    if (err) {
      return res.status(400).json({ message: "Error deleting category", error: err });
    }
    res.json({ message: "Deleted the Category" });
  });
};
