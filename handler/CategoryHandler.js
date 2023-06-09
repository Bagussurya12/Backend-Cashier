import category from "../models/Category.js";
const getAllCategoryHandler = async (req, res) => {
  try {
    // Handler GET Category
    const categories = await category.find({ status: "active" });
    if (!categories) {
      throw { code: 500, message: "GET CATEGORIES FAILED" };
    }
    return res.status(200).json({
      status: true,
      total: categories.length,
      categories,
    });
  } catch (err) {
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
};

// Handler POST Category
const postCategoryHandler = async (req, res) => {
  try {
    if (!req.body.title) {
      throw { code: 428, message: " Title Is Require" };
    }
    const title = req.body.title;

    const newCategory = new category({
      title: title,
    });
    const Category = await newCategory.save();

    if (!Category) {
      throw { code: 500, message: "Store Category Failed" };
    }

    return res.status(200).json({
      status: true,
      Category,
    });
  } catch (err) {
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
};

export { getAllCategoryHandler, postCategoryHandler };
