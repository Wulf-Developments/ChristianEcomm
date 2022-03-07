import expressAsyncHandler from "express-async-handler";
import Expense from "../../../models/expenseModel.js";

/**
 * @description: Deletes an Expense Report
 * @access:      Private/Admin - only logged in admins should be able to access
 *              this route.
 * @route:       DELETE /api/expenses/:id
 */
export const deleteExpense = expressAsyncHandler(async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    // Check to see if the expense exist in the system
    if (!expense) {
      return res
        .status(404)
        .json({ message: `Cannot find Expense report on Server` });
    }
    await expense.remove();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    if (error.kind === "ObjectId") {
      return res
        .status(404)
        .json({ message: "Cannot find Expense report on Server" });
    }
    res
      .status(500)
      .json({ message: `Server Error, Problem Deleting Expense Report` });
  }
});
