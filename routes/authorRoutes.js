const express = require("express");
const router = express.Router();

const {
  getAuthor,
  getAuthors,
  createAuthor,
  deleteAuthor,
} = require("../controller/authorController");

router.post("/getAuthor", getAuthor);
router.get("/getAuthors", getAuthors);
router.post("/createAuthor", createAuthor);
router.delete("/deleteAuthor/:id", deleteAuthor);

module.exports = router;
