import product from "../models/Products.js";
import category from "../models/Category.js";
import mongoose from "mongoose";

// GET PRODUCT HANDLER
const getAllProductHandler = async (req, res) => {
  try {
    const products = await product.find({ status: "active" });

    if (!products) {
      throw { code: 500, message: "GET PRODUCTS FAILED" };
    }
    return res.status(200).json({
      status: true,
      total: products.length,
      products,
    });
  } catch (err) {
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
};

// Handler POST Category
const postProductHandler = async (req, res) => {
  try {
    // if (!req.body.title) {
    //   throw { code: 428, message: " Title Is Require" };
    // }

    // is Required Fields
    if (!req.body.title) {
      throw { code: 428, message: "Title Harus di isi" };
    }
    if (!req.body.thumbnail) {
      throw { code: 428, message: "Thumbnail Harus di isi" };
    }
    if (!req.body.price) {
      throw { code: 428, message: "Harga Harus di isi" };
    }
    if (!req.body.categoryId) {
      throw { code: 428, message: "ID Category Harus di isi" };
    }
    // Is Products Exist
    const productExist = await product.findOne({ title: req.body.title });
    if (productExist) {
      throw { code: 428, message: "Product Exists" };
    }

    // is Object Id
    if (!mongoose.Types.ObjectId.isValid(req.body.categoryId)) {
      throw { code: 500, message: "categoryId Invalid" };
    }
    // Is Category Exist
    const categoryExist = await category.findOne({ _id: req.body.categoryId });
    if (!categoryExist) {
      throw { code: 428, message: "Category Is Not Exist" };
    }

    // Body Load
    const title = req.body.title;
    const thumbnail = req.body.thumbnail;
    const price = req.body.price;
    const categoryId = req.body.categoryId;

    const newProduct = new product({
      title: title,
      thumbnail: thumbnail,
      price: price,
      categoryId,
    });
    const Product = await newProduct.save();

    if (!Product) {
      throw { code: 500, message: "Store Category Failed" };
    }

    return res.status(200).json({
      status: true,
      Product,
    });
  } catch (err) {
    if (!err.code) {
      err.code = 500;
    }
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
};

export { postProductHandler, getAllProductHandler };
