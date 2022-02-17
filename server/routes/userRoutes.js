import express from "express";
import { activateAccount } from "../controllers/Admin/activateAccount.js";
import { ForgotPassword } from "../controllers/Auth/ForgotPassword.js";
import { ResetPassword } from "../controllers/Auth/ResetPassword.js";
import { removeAccount } from "../controllers/User/removeAccount.js";
import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  registerUser,
  updateUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post(`/login`, authUser);

//This will return the user profile on a GET command
//Will update user profile on a PUT command
//Both routes are protected, and will need a valid token passed back to work correctly.
router
  .route(`/profile`)
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);
router.route("/:id/delete").put(removeAccount);
router.route("/:id/activate").put(protect, admin, activateAccount);
router.route("/forgotpassword").post(ForgotPassword);
router.route("/resetpassword/:resettoken").put(ResetPassword);
export default router;
