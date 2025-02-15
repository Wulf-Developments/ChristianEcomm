import asyncHandler from "express-async-handler";
import sendEmail from "../utils/sendEmail.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import { orderReceipt } from "../EmailTemplates/orderReceipt.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      user_name: req.user.name,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    // Need to remove items out of stock so people cant buy objects that arent available.
    // Get the array of products from the order.
    const products = order.orderItems;
    // we need to loop over the array of products and remove from stock the qty, of each product

    await products.map(async (product) => {
      try {
        const productToBeUpdated = await Product.findById(product.product);
        // console.log(product);
        if (!productToBeUpdated) {
          return res.status(400).json({ message: "cannot find product" });
        }
        if (product.price !== productToBeUpdated.price) {
          return res.status(400).json({
            message: `Product: ${product.name}\`s price does not match database, please contact support`,
          });
        }
        productToBeUpdated.countInStock -= product.qty;
        productToBeUpdated.save();
        // Send message to store owner
        await sendEmail({
          email: process.env.SUPPORT_EMAIL,
          subject: `New Order - Crown Of Life Products`,
          message: await orderReceipt(order),
        });

        // Send message to client
        await sendEmail({
          email: order.paymentResult.email_address,
          subject: `Order Receipt - Crown Of Life Products`,
          message: await orderReceipt(order),
        });
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
      } catch (error) {
        res.status(500).json({
          message: `Failed product Verification, please contact support if problem persist`,
        });
      }
    });
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Order.countDocuments({
      user: req.user._id,
    });
    const orders = await Order.find({ user: req.user._id })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });
    res.json({ orders, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(500).json({
      message:
        "Problem Retrieving Your Orders from the database, please try again later",
    });
  }
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          user_name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Order.countDocuments({ ...keyword });
    const orders = await Order.find({ ...keyword })
      .populate("user", "id name email")
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });
    res.json({ orders, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Problem retrieving orders from the server" });
  }
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};
