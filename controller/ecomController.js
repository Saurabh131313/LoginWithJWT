const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { protect } = require("../route/auth");
const bcrypt = require("bcryptjs");
const Product = require("../models/product");

module.exports.addProduct = async (req, res) => {
  try {
    const { title, color, price } = req.body;
    if (!title || !color || !price) {
      res.status(400).json({
        code: "400",
        msg: "All fileds required",
        data: null,
      });
    }
    const newStore = new Product({
      title: req.body.title,
      desc: req.body.desc,
      img: req.body.img,
      categories: req.body.categories,
      size: req.body.size,
      color: req.body.color,
      price: req.body.price,
    });

    const addStore = await newStore.save();
    res.status(201).json({
      code: "201",
      msg: "Product added Successfully",
      data: addStore,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports.allProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json({
      code: "200",
      msg: "All Products",
      data: allProducts,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const findproduct = await Product.findById({ _id: req.params.id });
    if (!findproduct) {
      res.status(404).json({
        code: "404",
        msg: "Product Not Found",
        data: null,
      });
    }
    const updatedProduct = await Product.findById({ _id: req.params.id });

    (updatedProduct.title = req.body.title),
      (updatedProduct.desc = req.body.desc),
      (updatedProduct.img = req.body.img),
      (updatedProduct.categories = req.body.categories),
      (updatedProduct.size = req.body.size),
      (updatedProduct.color = req.body.color),
      (updatedProduct.price = req.body.price),
      updatedProduct.save();

    return res.status(202).json({
      code: "202",
      msg: "Product Updated Successfully",
      data: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const findproduct = await Product.findById({ _id: req.params.id });
    if (!findproduct) {
      res.status(404).json({
        code: "404",
        msg: "Product Not Found",
        data: null,
      });
    }
    const deletedProduct = await Product.findByIdAndDelete({
      _id: req.params.id,
    });

    return res.status(202).json({
      code: "202",
      msg: "Product Deleted Successfully",
      data: deletedProduct,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
