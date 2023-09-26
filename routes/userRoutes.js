const express = require("express");
const router = express.Router();

const {
  createUser,
  userLogin,
  getUser,
} = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", createUser);
router.post("/login", userLogin);
router.get("/getUser", authMiddleware, getUser);

module.exports = router;
