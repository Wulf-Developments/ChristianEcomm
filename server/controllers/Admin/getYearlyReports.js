import expressAsyncHandler from "express-async-handler";
import Order from "../../models/orderModel.js";

/**
 * @desc:   Retrieve's all the year's reports to display in the admin panel
 *          This will look at all orders from the current year to the previous year.
 * @route:  GET /api/admin/reports
 * @access: Private - Admin only super users should use this route..
 */
export const getYearlyReports = expressAsyncHandler(async (req, res) => {
  // Create a date, to get the current year.
  let date = new Date();
  date = date.getFullYear();
  // need to query Orders for all orders that are LESS than, but Greater than the year before.
  // i.e, date - 1 = 2021
  const orders = await Order.find({
    paidAt: { $lt: date },
    paidAt: { $gt: date - 1 },
  });
  res.status(200).json(orders);
});
