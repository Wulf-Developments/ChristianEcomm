import expressAsyncHandler from "express-async-handler";
import Category from "../../models/categoriesModel.js";
/**
 * @description: Updates a category
 * @route: PUT /api/category/:id
 * @access: Private/admin
 */
export const updateCategory = expressAsyncHandler(async (req, res) => {
  try {
    // find the category
    const category = await Category.findById(req.params.id);
    // check if it exists
    if (!category) {
      return res
        .status(404)
        .json({ message: `The category could not be found` });
    }
    // Client should only update the category name, in this function updating the products associated with it
    // should use a different function
    category.cat_name = req.body.cat_name;
    // save
    category.save();
    // return updated category
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});
