import expressAsyncHandler from "express-async-handler";
import Dynamic from "../../../models/dynamicContentModel.js";

/**
 * @description: Returns dynamic content
 * @access:      Public
 * @route:       GET /api/dynamic/:type
 */
export const getContent = expressAsyncHandler(async (req, res) => {
  try {
    const content = await Dynamic.findOne({ type: req.params.type });
    // Check to see if the content exist in the system
    if (!content) {
      return res.status(404).json({
        message: `Cannot find content: ${req.params.type} on Server`,
      });
    }
    res.status(200).json(content);
  } catch (error) {
    console.error(error);
    if (error.kind === "ObjectId") {
      return res
        .status(404)
        .json({ message: "Cannot find Expense report on Server" });
    }
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
});
