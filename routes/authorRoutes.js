const express = require("express");
const router = express.Router();

const {
  getAuthor,
  getAuthors,
  createAuthor,
  deleteAuthor,
} = require("../controller/authorController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/getAuthor", authMiddleware, getAuthor);
router.get("/getAuthors", getAuthors);
router.post("/createAuthor", authMiddleware, createAuthor);
router.delete("/deleteAuthor/:id", authMiddleware, deleteAuthor);

module.exports = router;
