import expressAsyncHandler from "express-async-handler";
import Expense from "../../../models/expenseModel.js";

/**
 * @description: Returns all expense reports
 * @access:      Private/Admin - only logged in admins should be able to access
 *              this route.
 * @route:       GET /api/expenses
 */
export const getExpenses = expressAsyncHandler(async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          description: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Expense.countDocuments({ ...keyword });
    const expenses = await Expense.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 })
      .populate("user", "id name");
    // res.status(200).json(products);
    res.json({ expenses, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});
