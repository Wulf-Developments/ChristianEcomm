import expressAsyncHandler from "express-async-handler";
import Order from "../../models/orderModel.js";
/**
 * @desc:   Will look at the order table and perform a certain amount of analytics. For the
 *          month prior to the current month.
 * @route:  GET /api/admin/reports/orders
 * @access: Private - Admin only super users should use this route..
 */
export const orderReports = expressAsyncHandler(async (req, res) => {
  try {
    // setup dates
    const lastMonth = new Date();
    // This should set the month to the month prior
    // lastMonth.setMonth(lastMonth.getMonth() - 1);
    lastMonth.setDate("0");
    const thisMonth = new Date();

    // We should count all the documents that were created over the last month,
    // this will be the total number of orders for the month prior
    const lastMonthSales = await Order.countDocuments({
      // should cut the amount of orders off at the beginning of the current month
      createdAt: { $lte: thisMonth.getMonth() + 1 },
      createdAt: { $gte: lastMonth.getMonth() },
    });
    const thisMonthSales = await Order.countDocuments({
      createdAt: { $lte: thisMonth.getMonth() + 1 },
    });
    console.log(lastMonth.getMonth() + 1);
    // we need to also find the total of sales from the previous month, and this month
    const totalLast = await Order.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: "$createdAt" }, thisMonth.getMonth() + 1],
            $eq: [{ $month: "$createdAt" }, lastMonth.getMonth() + 1],
          },
        },
      },
      {
        $group: {
          // using $group, _id has to be there or it doesnt
          // return anything, though we dont need an _id
          _id: null,
          total: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);
    // we need to also find the total of sales from the previous month, and this month
    const totalThis = await Order.aggregate([
      {
        $match: {
          $expr: {
            $eq: [
              {
                $month: "$createdAt",
              },
              thisMonth.getMonth() + 1,
            ],
          },
        },
      },
      {
        $group: {
          // using $group, _id has to be there or it doesnt
          // return anything, though we dont need an _id
          _id: null,
          total: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);
    // percent difference formula
    // PD = (|x - y|/((x + y)/2) * 100)
    // this will take the number of total sales from last month,
    // and the number of total sales this month, and give a percentage
    // since the aggregation method returns an array, we need to be sure to select the first
    // value of the array, and plan for times when their isnt anything in the array.
    // thus setting the value to 0
    const totalSalesLast = totalLast.length > 0 ? totalLast[0].total : 0;
    const totalSalesThis = totalThis.length > 0 ? totalThis[0].total : 0;
    const percentSales =
      (Math.abs(totalSalesLast - totalSalesThis) /
        ((totalSalesLast + totalSalesThis) / 2)) *
      100;
    res.status(200).json({
      lastMonth: lastMonthSales,
      thisMonth: thisMonthSales,
      totalSalesLast,
      totalSalesThis,
      // if totalSalesLast is greater than totalSalesThis it can be reasonably be assumed
      // that percentSales is a percent decrease
      percentChange:
        totalSalesLast > totalSalesThis
          ? -percentSales.toFixed(2)
          : percentSales.toFixed(2),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});
