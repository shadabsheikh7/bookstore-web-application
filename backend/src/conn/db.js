/** @format */

import mongoose from "mongoose";

const connection = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("MONGO_URI is missing in .env");
    }

    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("✅ MongoDB CONNECTED successfully");
    console.log(`✅ Database: ${mongoose.connection.name}`);
  } catch (error) {
    console.error("❌ MongoDB CONNECTION ERROR:");
    console.error(error.message);

    process.exit(1);
  }
};

export default connection;