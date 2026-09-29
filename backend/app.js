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

export default app;