const express = require("express");
const router = express.Router();

const {
  createBook,
  getBooks,
  getBook,
  deleteBook,
  booksByAuthor,
  booksByCategory,
  booksPagination,
} = require("../controller/bookController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/createBook", authMiddleware, createBook);
router.get("/getBooks", getBooks);
router.post("/getBook", authMiddleware, getBook);
router.delete("/deleteBook/:id", authMiddleware, deleteBook);
router.get("/booksByAuthor", booksByAuthor);
router.get("/booksByCategory/:category", booksByCategory);
router.get("/bookPagination", booksPagination);

module.exports = router;
