/** @format */

import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authntication2 from "./userAuth2.js";
const userrouter = express.Router();

// ^ *******   api endpoints
// ~ sign -up api

userrouter.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;
    // & check username should be greater than 3 words
    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "username length should be greater than 3" });
    }
    // & check username already exists
    const existingusername = await User.findOne({ username });

    if (existingusername) {
      return res.status(400).json({ message: "user already exists" });
    }

    // & check email already exists
    const existingemail = await User.findOne({ email: email });
    if (existingemail) {
      return res.status(400).json({ message: "email already exists" });
    }

    bcrypt.hash(password, 10, async function (err, hash) {
      // !  Store hash in your password DB.
      if (err) {
        return res.status(500).json({ message: "internal server error" });
      }
      const saveuser = new User({
        username: username,
        email: email,
        password: hash,
        address: address,
      });
      await saveuser.save();
      return res.status(200).json({ message: "successfully  Register" });
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
});
// ~ sign-in api

userrouter.post("/sign-in", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        messaage: "please provide email and password properly",
      });
    }
    const userfind = await User.findOne({ email });
    if (!userfind) {
      return res.status(400).json({
        messaage: "user not find",
      });
    }
    bcrypt.compare(password, userfind.password, function (err, result) {
      if (err) {
        return res.status(500).json({
          message: "internal server error",
        });
      }

      if (!result) {
        return res.status(400).json({
          message: "incorrect username and password",
        });
      }
      if (result) {
        const payload = {
          _id: userfind._id,
          email: userfind.email,
          role: userfind.role,
        };
        const tokenoption = {
          httpOnly: true,
          secure: true,
        };
        jwt.sign(
          payload,
          process.env.SECRET,
          { expiresIn: "8h" },
          function (err, token) {
            if (err) {
              return res.status(500).json({
                messaage: "internal server error",
              });
            }
            // ✅ Login successful, token generated
            return res.status(200).json({
              id: userfind._id,
              role: userfind.role,
              token: token,
            });
          },
        );
      }
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
});
// ~user details api
userrouter.get("/user-details", authntication2, async (req, res) => {
  try {
    const { _id } = req.user;

    if (_id === "") {
      return res.status(400).json({
        messaage: err.messaage,
      });
    }
    const userfindnew = await User.findById(_id).select("-password");
    return res.status(201).json(userfindnew);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
});

// ~ update user address api
userrouter.put("/update-address", authntication2, async (req, res) => {
  try {
    const { _id } = req.user;
    const { address } = req.body;
    await User.findByIdAndUpdate(_id, { address: address });
    return res.status(200).json({ message: "user updated succefully " });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
});
export default userrouter;
