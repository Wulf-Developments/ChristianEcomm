import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const router = express.Router();

//@desc fetch all products
//@route GET /api/products
//@access Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    //find all products
    const products = await Product.find({});
    res.json(products);
  })
);

//@desc fetch single product
//@route GET /api/products/:id
//@access Public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    // Check to see if there is a product
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product Not Found" });
    }
  })
);

export default router;
