import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser);
router.post(`/login`, authUser);

//This will return the user profile on a GET command
//Will update user profile on a PUT command
//Both routes are protected, and will need a valid token passed back to work correctly.
router
  .route(`/profile`)
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
