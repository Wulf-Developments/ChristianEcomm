import expressAsyncHandler from "express-async-handler";
import Category from "../../models/categoriesModel.js";
/**
 * @description: Removes category from system
 * @route: DELETE /api/category/:id
 * @access: Private / Admin - Only Authorized Admins should delete categories.
 */
export const deleteCategory = expressAsyncHandler(async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});
