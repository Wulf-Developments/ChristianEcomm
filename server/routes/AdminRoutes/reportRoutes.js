import express from "express";
import { getYearlyReports } from "../../controllers/Admin/getYearlyReports.js";
import { orderReports } from "../../controllers/Admin/orderReports.js";
import { userReports } from "../../controllers/Admin/userReports.js";
import { protect, admin } from "../../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(protect, admin, getYearlyReports);
router.route("/users").get(protect, admin, userReports);
router.route("/orders").get(protect, admin, orderReports);

export default router;
