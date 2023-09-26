// errorMiddleware.js
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Define a custom error handling middleware
const errorMiddleware = (err, req, res, next) => {
  console.error(err); // Log the error for debugging (you can customize this)

  // Handle Prisma database errors
  if (err instanceof PrismaClient.PrismaClientKnownRequestError) {
    return res.status(500).json({ error: "Database error" });
  }

  // Handle JWT authentication errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Authentication failed" });
  }

  // Handle bcrypt errors (e.g., invalid password)
  if (err.name === "BcryptError") {
    return res.status(401).json({ error: "Invalid password" });
  }

  // Handle other errors (e.g., unhandled exceptions)
  res.status(500).json({ error: "Internal server error" });
};

module.exports = errorMiddleware;
