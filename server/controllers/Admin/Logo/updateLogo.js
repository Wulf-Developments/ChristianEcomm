import expressAsyncHandler from "express-async-handler";
import Dynamic from "../../../models/dynamicContentModel.js";

/**
 * @description Will update the url location of the logo
 * @route       PUT /api/admin/logo
 * @access      Private/Admin
 */
export const updateLogo = expressAsyncHandler(async (req, res) => {
  try {
    const logo = await Dynamic.find({ type: "Logo" });
    if (!logo) {
      return res.status(404).json({ message: `Could not find Logo to update` });
    }
    console.log(req.body);
    const updatedLogo = await Dynamic.findOneAndUpdate(
      { type: "Logo" },
      req.body,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    res.status(200).json(updatedLogo);
  } catch (error) {
    console.error(error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Cannot find Logo on Server" });
    }
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});
