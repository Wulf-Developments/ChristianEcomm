import express from "express";
import { getYearlyReports } from "../../controllers/Admin/getYearlyReports.js";
import { protect, admin } from "../../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(protect, admin, getYearlyReports);

export default router;
