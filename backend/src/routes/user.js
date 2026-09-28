/** @format */

import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authntication2 from "./userAuth2.js";

const userrouter = express.Router();

// ==========================================
// SIGN-UP
// ==========================================

userrouter.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email and password are required",
      });
    }

    if (username.length < 4) {
      return res.status(400).json({
        message: "Username length should be greater than 3",
      });
    }

    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const saveUser = new User({
      username,
      email,
      password: hashedPassword,
      address,
    });

    await saveUser.save();

    return res.status(201).json({
      message: "Successfully registered",
    });
  } catch (error) {
    console.error("SIGN-UP ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

// ==========================================
// SIGN-IN
// ==========================================

userrouter.post("/sign-in", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN REQUEST:", email);

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }

    const userFind = await User.findOne({ email });

    if (!userFind) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    if (!userFind.password) {
      return res.status(500).json({
        message: "User password is missing in database",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userFind.password,
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Incorrect username or password",
      });
    }

    if (!process.env.SECRET) {
      console.error("SECRET is missing from .env");

      return res.status(500).json({
        message: "JWT secret is missing",
      });
    }

    const payload = {
      _id: userFind._id,
      email: userFind.email,
      role: userFind.role,
    };

    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "8h",
    });

    return res.status(200).json({
      message: "Login successful",
      id: userFind._id,
      role: userFind.role,
      token,
    });
  } catch (error) {
    console.error("SIGN-IN ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

// ==========================================
// USER DETAILS
// ==========================================

userrouter.get("/user-details", authntication2, async (req, res) => {
  try {
    const { _id } = req.user;

    if (!_id) {
      return res.status(400).json({
        message: "User ID is missing",
      });
    }

    const userFindNew = await User.findById(_id).select("-password");

    if (!userFindNew) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(userFindNew);
  } catch (error) {
    console.error("USER DETAILS ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

// ==========================================
// UPDATE USER ADDRESS
// ==========================================

userrouter.put("/update-address", authntication2, async (req, res) => {
  try {
    const { _id } = req.user;
    const { address } = req.body;

    if (!_id) {
      return res.status(400).json({
        message: "User ID is missing",
      });
    }

    await User.findByIdAndUpdate(_id, { address });

    return res.status(200).json({
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("UPDATE ADDRESS ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default userrouter;