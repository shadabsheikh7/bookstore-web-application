/** @format */
import dotenv from "dotenv";
import app from "../app.js";
import connection from "./conn/db.js";

dotenv.config();
// *connecting the database
const startServer = async () => {
  try {
    await connection(process.env.MONGO_URI);
    console.log("✅ Database connected, starting server...");

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`✅ Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
