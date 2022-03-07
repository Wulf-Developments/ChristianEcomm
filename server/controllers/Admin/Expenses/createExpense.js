import expressAsyncHandler from "express-async-handler";
import Expense from "../../../models/expenseModel.js";

/**
 * @description: Creates a new Expense Report
 * @access:      Private/Admin - only logged in admins should be able to access
 *              this route.
 * @route:       POST /api/expenses
 */
export const createExpense = expressAsyncHandler(async (req, res) => {
  try {
    const expense = new Expense({
      user: req.user._id,
      description: `Sample Expense Description`,
      receiptImage: `/images/sample.jpg`,
      paymentMethod: `Sample Payment method`,
      paidAt: Date.now(),
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: `Server Error, Problem Creating Expense Report` });
  }
});
