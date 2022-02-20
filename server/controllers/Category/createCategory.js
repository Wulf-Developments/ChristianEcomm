import expressAsyncHandler from "express-async-handler";
import Category from "../../models/categoriesModel.js";
/**
 * @description: Creates a new category to group items
 * @route: POST /api/category
 * @access: Private / Admin - Only Authorized Admins should create new categories.
 */
export const createCategory = expressAsyncHandler(async (req, res) => {
  try {
    // Destructure body
    const { cat_name } = req.body;

    // create new category
    const new_cat = await Category.create({ cat_name, user: req.user._id });

    // respond with the new cat
    res.status(201).json(new_cat);
  } catch (error) {
    res.status(500).json({ message: `Sever Error: ${error.message}` });
  }
});
