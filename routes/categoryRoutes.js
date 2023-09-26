const express = require("express");
const router = express.Router();

const {
  allCategories,
  getCategory,
  changeCategory,
} = require("../controller/categoriesController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/listCategories", allCategories);
router.post("/getCategory", authMiddleware, getCategory);
router.put("/changeCategory", authMiddleware, changeCategory);

module.exports = router;
