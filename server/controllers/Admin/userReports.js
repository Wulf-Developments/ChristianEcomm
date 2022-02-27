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
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const thisMonth = new Date();

    // Query the database for results
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: lastMonth },
      createdAt: { $lte: thisMonth.getMonth() + 1 },
    });
    console.log(thisMonth.getMonth() + 1);
    // Query the database for results
    // of new users
    const newUsers = await User.countDocuments({
      createdAt: { $gte: thisMonth.getMonth() + 1 },
    });
    // percent difference formula
    // PD = (|x - y|/((x + y)/2) * 100)
    // this will take the number of users from last month,
    // and the number of new users this month, and give a percentage
    // however, this does not tell whether it is negative or positive, just a percent
    // however, its reasonable to assume that if the number of lastMonth users is greater
    // than newUsers, its a negative number.
    const percentNewUsers =
      (Math.abs(newUsers - lastMonthUsers) /
        ((lastMonthUsers + newUsers) / 2)) *
      100;

    // we also want to get the total amount of users
    const total = await User.countDocuments({});
    // Respond with results
    res.json({
      lastMonth: lastMonthUsers,
      thisMonth: newUsers,
      percentNew:
        newUsers > lastMonthUsers ? percentNewUsers : -percentNewUsers,
      total: total,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error ${error.message}` });
  }
});
