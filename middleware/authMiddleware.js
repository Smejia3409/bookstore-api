// authMiddleware.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const secretKey = "your-secret-key"; // Replace with your actual secret key

// Middleware to authenticate incoming requests
const authMiddleware = async (req, res, next) => {
  try {
    // Extract the token from the request headers
    const token = req.header("Authorization").replace("Bearer ", "");

    // Verify the token and decode the payload
    const payload = jwt.verify(token, "abc123");

    // Fetch the user from the database based on the payload's user ID
    const user = await prisma.user.findUnique({ where: { id: payload.id } });

    if (!user) {
      throw new Error("User not found");
    }

    // Attach the user object to the request for future use
    req.user = user;

    // Continue processing the request
    next();
  } catch (error) {
    res.status(401).send({ error: "Authentication failed" });
  }
};

module.exports = authMiddleware;
