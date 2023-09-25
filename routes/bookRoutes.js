const express = require("express");
const router = express.Router();

const {
  createBook,
  getBooks,
  getBook,
  deleteBook,
} = require("../controller/bookController");

router.post("/createBook", createBook);
router.get("/getBooks", getBooks);
router.post("/getBook", getBook);
router.delete("/deleteBook/:id", deleteBook);

module.exports = router;
