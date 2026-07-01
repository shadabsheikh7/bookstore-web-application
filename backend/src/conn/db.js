/** @format */

import mongoose from "mongoose";

const connection = async (dburi) => {
  try {
    await mongoose.connect(dburi);
    console.log(" MongoDB CONNECTED successfully");
    console.log("Database URI:", dburi);
  } catch (error) {
    console.log(" MongoDB Connection Error:", error.message);
    console.log("error in the database connection");
    throw error;
  }
};
export default connection;
