import expressAsyncHandler from "express-async-handler";
import Category from "../../models/categoriesModel.js";
import Product from "../../models/productModel.js";
/**
 * @description: Returns a Single Category and all the products in it
 * @route: GET /api/category/:id
 * @access: Public
 */
export const getCategory = expressAsyncHandler(async (req, res) => {
  try {
    const category = await Category.findOne({
      slug: req.params.slug,
    });
    if (!category) {
      return res
        .status(404)
        .json({
          message: `Could not find category with Slug: ${req.params.slug}`,
        });
    }

    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Product.countDocuments({
      ...keyword,
      // find all products where [categories] category id, equals category._id
      "categories.category": category._id,
    });
    const products = await Product.find({
      ...keyword,
      // find all products where [categories] category id, equals category._id
      "categories.category": category._id,
    })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });
    res
      .status(200)
      .json({ category, products, pages: Math.ceil(count / pageSize), page });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});
