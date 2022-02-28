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
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        message: `Could not find category with ID: ${req.params.id}`,
      });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});
