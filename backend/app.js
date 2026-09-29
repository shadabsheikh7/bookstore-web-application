/** @format */

import dotenv from "dotenv";
dotenv.config();

import connection from "./src/conn/db.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userrouter from "./src/routes/user.js";
import bookrouter from "./src/routes/books.js";
import favouriterouter from "./src/routes/favourites.js";
import cartrouter from "./src/routes/cart.js";
import orderrouter from "./src/routes/order.js";

import User from "./src/models/user.js";
import bcrypt from "bcrypt";

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", userrouter);
app.use("/api/v1", bookrouter);
app.use("/api/v1", favouriterouter);
app.use("/api/v1", cartrouter);
app.use("/api/v1", orderrouter);

// Temporary admin update
app.post("/api/v1/update-admin", async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        message: "Password is required",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.findOneAndUpdate(
      { email: "alpha@gmail.com" },
      {
        email: "sheikh@gmail.com",
        password: hashedPassword,
        role: "admin",
      },
      { new: true }
    );

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    res.status(200).json({
      message: "Admin email and password updated successfully",
    });
  } catch (error) {
    console.error("Admin update error:", error);

    res.status(500).json({
      message: "Error updating admin",
      error: error.message,
    });
  }
});

export default app;