import expressAsyncHandler from "express-async-handler";
import Dynamic from "../../../models/dynamicContentModel.js";

/**
 * @description This route should only be used once, by the developer to create a logo file.
 *              Client should only ever use the PUT command to change the logo
 *              this function simply creates a blank logo file and should be updated immediately.
 * @route       POST /api/admin/logo
 * @access      Developer
 */
export const createLogo = expressAsyncHandler(async (req, res) => {
  try {
    const logo = new Dynamic({
      type: "Logo",
      value: "/images/sample.jpg",
    });
    await logo.save();
    res.status(201).json(logo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error, Problem Creating Logo ` });
  }
});
