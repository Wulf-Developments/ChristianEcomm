import expressAsyncHandler from "express-async-handler";
import Expense from "../../../models/expenseModel.js";

/**
 * @description: Returns a single expense report
 * @access:      Private/Admin - only logged in admins should be able to access
 *              this route.
 * @route:       GET /api/expenses/:id
 */
export const getExpense = expressAsyncHandler(async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    // Check to see if the expense exist in the system
    if (!expense) {
      return res
        .status(404)
        .json({ message: `Cannot find Expense report on Server` });
    }
    res.status(200).json(expense);
  } catch (error) {
    console.error(error);
    if (error.kind === "ObjectId") {
      return res
        .status(404)
        .json({ message: "Cannot find Expense report on Server" });
    }
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});
