import express from "express";
import { protect, admin } from "../../middleware/authMiddleware.js";
import { getCustomProducts } from "../../controllers/Printify/getCustomProducts.js";
const router = express.Router();

router.route("/").get(getCustomProducts);

export default router;
