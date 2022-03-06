import express from "express";
import { protect, admin } from "../../middleware/authMiddleware.js";
import { getContent } from "../../controllers/Admin/Dynamic/getContent.js";
import { createLogo } from "../../controllers/Admin/Logo/createLogo.js";
import { updateLogo } from "../../controllers/Admin/Logo/updateLogo.js";
const router = express.Router();

router.route("/:type").get(getContent);
router.route("/logo").put(protect, admin, updateLogo).post(createLogo);
export default router;
