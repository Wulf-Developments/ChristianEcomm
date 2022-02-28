import express from "express";
import { createCategory } from "../controllers/Category/createCategory.js";
import { getCategories } from "../controllers/Category/getCategories.js";
import { getCategory } from "../controllers/Category/getCategory.js";
import { updateCategory } from "../controllers/Category/updateCategory.js";
import { deleteCategory } from "../controllers/Category/deleteCategory.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(getCategories).post(protect, admin, createCategory);
router
  .route("/:id")
  .get(getCategory)
  .delete(protect, admin, deleteCategory)
  .put(protect, admin, updateCategory);
router.route("/:slug");

export default router;
