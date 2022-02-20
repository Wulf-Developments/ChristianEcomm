import expressAsyncHandler from "express-async-handler";
import Category from "../../models/categoriesModel.js";
/**
 * @description: Returns all Categories in the system
 * @route: GET /api/category
 * @access: Public
 */
export const getCategories = expressAsyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({}).populate("user", "id name");
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});
