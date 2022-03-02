import expressAsyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

/**
 * @desc:   Will look at the Users table and perform a set of analytics
 * @route:  GET /api/admin/reports/users
 * @access: Private - Admin only super users should use this route..
 */
export const userReports = expressAsyncHandler(async (req, res) => {
  try {
    // setup dates
    const lastMonth = new Date();
    // This should set the month to the month prior
    // lastMonth.setMonth(lastMonth.getMonth() - 1);
    lastMonth.setDate("0");
    const thisMonth = new Date();
    // We should count all the documents that were created over the last month,
    // this will be the total number of orders for the month prior
    const lastMonthUsers = await User.countDocuments({
      // should cut the amount of orders off at the beginning of the current month
      createdAt: { $lte: thisMonth.getMonth() + 1 },
      createdAt: { $gte: lastMonth.getMonth() },
    });
    const newUsers = await User.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: "$createdAt" }, thisMonth.getMonth() + 1],
          },
        },
      },
    ]);
    // percent difference formula
    // PD = (|x - y|/((x + y)/2) * 100)
    // this will take the number of users from last month,
    // and the number of new users this month, and give a percentage
    // however, this does not tell whether it is negative or positive, just a percent
    // however, its reasonable to assume that if the number of lastMonth users is greater
    // than newUsers, its a negative number.
    const percentNewUsers =
      (Math.abs(newUsers.length - lastMonthUsers) /
        ((lastMonthUsers + newUsers.length) / 2)) *
      100;

    // we also want to get the total amount of users
    const total = await User.countDocuments({});
    // Respond with results
    res.json({
      lastMonth: lastMonthUsers,
      thisMonth: newUsers.length,
      percentNew:
        newUsers > lastMonthUsers ? percentNewUsers : -percentNewUsers,
      total: total,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error ${error.message}` });
  }
});
