import asyncHandler from "../../middleware/async.js";
import sendEmail from "../../utils/sendEmail.js";

/*
  @Desc:   Allows a user to send a support email
  @Route:  POST /api/support
  @access: Public
*/
export const sendSupportMail = asyncHandler(async (req, res) => {
  try {
    const message =
      `<h3>Name: ${req.body.name}</h3>` +
      `<p>Email: ${req.body.email}</p>` +
      `<p>Phone: ${req.body.phone}</p>` +
      `<p>Message: ${req.body.message}</p>`;
    try {
      await sendEmail({
        email: process.env.SUPPORT_EMAIL,
        subject: `Support Email - Crown Of Life Products`,
        message: message,
      });
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json(error);
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong on the server please try again later",
    });
  }
});
