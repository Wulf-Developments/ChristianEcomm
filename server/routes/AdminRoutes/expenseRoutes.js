import express from "express";
import { protect, admin } from "../../middleware/authMiddleware.js";
import { getExpenses } from "../../controllers/Admin/Expenses/getExpenses.js";
import { getExpense } from "../../controllers/Admin/Expenses/getExpense.js";
import { createExpense } from "../../controllers/Admin/Expenses/createExpense.js";
import { updateExpenses } from "../../controllers/Admin/Expenses/updateExpenses.js";
import { deleteExpense } from "../../controllers/Admin/Expenses/deleteExpense.js";
const router = express.Router();
router.use(protect, admin);
router.route("/").get(getExpenses).post(createExpense);

router.route("/:id").get(getExpense).put(updateExpenses).delete(deleteExpense);

export default router;
