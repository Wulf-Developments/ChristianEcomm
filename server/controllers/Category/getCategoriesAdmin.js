import expressAsyncHandler from "express-async-handler";
import Category from "../../models/categoriesModel.js";
/**
 * @description: Returns all Categories in the system this is strictly for the admin search functionality.
 * @route: GET /api/category
 * @access: Private
 */
export const getCategoriesAdmin = expressAsyncHandler(async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          cat_name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const categories = await Category.find({ ...keyword })
      .sort({ createdAt: -1 })
      .populate("user", "_id name");
    if (!categories) {
      return res.status(404).json({ message: `No Categories found` });
    }

    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});
