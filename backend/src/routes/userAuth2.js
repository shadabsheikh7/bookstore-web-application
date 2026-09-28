/** @format */

import jwt from "jsonwebtoken";

const authntication2 = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Authentication token is required",
      });
    }

    // Supports both:
    // authorization: token
    // authorization: Bearer token

    let token = authHeader;

    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }

    if (!token) {
      return res.status(401).json({
        message: "Authentication token is missing",
      });
    }

    if (!process.env.SECRET) {
      return res.status(500).json({
        message: "JWT secret is missing",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.error("AUTH ERROR:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired. Please login again.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid token. Please login again.",
      });
    }

    return res.status(401).json({
      message: "Authentication failed",
    });
  }
};

export default authntication2;