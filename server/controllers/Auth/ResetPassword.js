import asyncHandler from "../../middleware/async.js";
import User from "../../models/userModel.js";
import crypto from "crypto";

/* @desc    Reset Password
   @route   PUT /api/auth/resetpassword/:resettoken
   @access  Public
 */
export const ResetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPassToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken: resetPassToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  // doesnt exist or password token expired
  if (!user) {
    return res.status(404).json({ message: "Invalid Token" });
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  res.status(201).res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  });
});
