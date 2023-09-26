const express = require("express");
const router = express.Router();

const {
  createBook,
  getBooks,
  getBook,
  deleteBook,
} = require("../controller/bookController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/createBook", authMiddleware, createBook);
router.get("/getBooks", authMiddleware, getBooks);
router.post("/getBook", authMiddleware, getBook);
router.delete("/deleteBook/:id", authMiddleware, deleteBook);

module.exports = router;
