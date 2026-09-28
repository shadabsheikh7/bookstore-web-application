/** @format */

import express from "express";
import mongoose from "mongoose";
import authntication2 from "./userAuth2.js";
import User from "../models/user.js";
import Books from "../models/books.js";

const cartrouter = express.Router();

// ==========================================
// GET CART
// ==========================================

cartrouter.get("/get-cart-item", authntication2, async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    /*
      Clean invalid cart items and keep only valid book references.
    */

    const validCart = [];

    for (const item of user.cart) {
      if (!item.book) {
        continue;
      }

      const book = await Books.findById(item.book);

      if (!book) {
        continue;
      }

      validCart.push({
        book: item.book,
        quantity: item.quantity || 1,
      });
    }

    user.cart = validCart;

    await user.save();

    const updatedUser = await User.findById(_id).populate({
      path: "cart.book",
      model: "Books",
    });

    const cartdata = [...updatedUser.cart].reverse();

    return res.status(200).json({
      status: "success",
      data: cartdata,
    });
  } catch (error) {
    console.error("GET CART ERROR:", error);

    return res.status(500).json({
      status: "error",
      message: "Internal server error getting cart",
      error: error.message,
    });
  }
});

// ==========================================
// ADD TO CART
// ==========================================

cartrouter.put("/add-to-cart", authntication2, async (req, res) => {
  try {
    const { _id } = req.user;
    const { bookid } = req.headers;

    if (!bookid) {
      return res.status(400).json({
        status: "error",
        message: "Book ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(bookid)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid Book ID",
      });
    }

    const bookObjectId = new mongoose.Types.ObjectId(bookid);

    const book = await Books.findById(bookObjectId);

    if (!book) {
      return res.status(404).json({
        status: "error",
        message: "Book not found",
      });
    }

    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Remove any broken/invalid cart entries
    const validCart = [];

    for (const item of user.cart) {
      if (!item.book) {
        continue;
      }

      const existingBook = await Books.findById(item.book);

      if (existingBook) {
        validCart.push({
          book: item.book,
          quantity: item.quantity || 1,
        });
      }
    }

    user.cart = validCart;

    // Check if book already exists
    const existingItem = user.cart.find(
      (item) => item.book.toString() === bookObjectId.toString(),
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cart.push({
        book: bookObjectId,
        quantity: 1,
      });
    }

    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Book added to cart",
    });
  } catch (error) {
    console.error("ADD TO CART ERROR:", error);

    return res.status(500).json({
      status: "error",
      message: "Internal server error adding book",
      error: error.message,
    });
  }
});

// ==========================================
// INCREASE QUANTITY
// ==========================================

cartrouter.put("/increase-cart/:bookid", authntication2, async (req, res) => {
  try {
    const { _id } = req.user;
    const { bookid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bookid)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid Book ID",
      });
    }

    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const item = user.cart.find(
      (cartItem) => cartItem.book.toString() === bookid,
    );

    if (!item) {
      return res.status(404).json({
        status: "error",
        message: "Book not found in cart",
      });
    }

    item.quantity += 1;

    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Quantity increased",
      quantity: item.quantity,
    });
  } catch (error) {
    console.error("INCREASE QUANTITY ERROR:", error);

    return res.status(500).json({
      status: "error",
      message: "Unable to increase quantity",
      error: error.message,
    });
  }
});

// ==========================================
// DECREASE QUANTITY
// ==========================================

cartrouter.put("/decrease-cart/:bookid", authntication2, async (req, res) => {
  try {
    const { _id } = req.user;
    const { bookid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bookid)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid Book ID",
      });
    }

    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const itemIndex = user.cart.findIndex(
      (cartItem) => cartItem.book.toString() === bookid,
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        status: "error",
        message: "Book not found in cart",
      });
    }

    const item = user.cart[itemIndex];

    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      user.cart.splice(itemIndex, 1);
    }

    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Quantity decreased",
    });
  } catch (error) {
    console.error("DECREASE QUANTITY ERROR:", error);

    return res.status(500).json({
      status: "error",
      message: "Unable to decrease quantity",
      error: error.message,
    });
  }
});

// ==========================================
// REMOVE FROM CART
// ==========================================

cartrouter.put("/rem-from-cart/:bookid", authntication2, async (req, res) => {
  try {
    const { _id } = req.user;
    const { bookid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bookid)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid Book ID",
      });
    }

    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const oldLength = user.cart.length;

    user.cart = user.cart.filter(
      (item) => item.book && item.book.toString() !== bookid,
    );

    if (user.cart.length === oldLength) {
      return res.status(404).json({
        status: "error",
        message: "Book not found in cart",
      });
    }

    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Book removed from cart",
    });
  } catch (error) {
    console.error("REMOVE CART ERROR:", error);

    return res.status(500).json({
      status: "error",
      message: "Unable to remove book",
      error: error.message,
    });
  }
});

export default cartrouter;