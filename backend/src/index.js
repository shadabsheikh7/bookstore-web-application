/** @format */

import dotenv from "dotenv";
dotenv.config();

import app from "../app.js";
import connection from "./conn/db.js";

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await connection();

    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
      console.log(`✅ API: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();