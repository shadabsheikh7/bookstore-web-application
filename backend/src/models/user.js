/** @format */

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    address: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
      unique: true,
    },

    avtar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png",
    },

    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },

    favourites: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Books",
      },
    ],

    cart: [
      {
        book: {
          type: mongoose.Types.ObjectId,
          ref: "Books",
          required: true,
        },

        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
      },
    ],

    orders: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;