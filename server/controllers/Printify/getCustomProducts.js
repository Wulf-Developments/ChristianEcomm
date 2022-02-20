import axios from "axios";
import expressAsyncHandler from "express-async-handler";

/**
 * @desc:   Retrieves all custom products from Printify merchant account
 * @route:  GET /api/printify
 * @access: Public
 */
export const getCustomProducts = expressAsyncHandler(async (req, res) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.PRINTIFY_ACCESS_TOKEN}`,
      },
    };
    const { data } = await axios.get(
      `https://api.printify.com/v1/shops/${process.env.PRINTIFY_STORE_ID}/products.json`,
      config
    );
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
