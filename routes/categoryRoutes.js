const express = require("express");
const router = express.Router();

const {
  allCategories,
  getCategory,
  changeCategory,
  categoriesPagination,
} = require("../controller/categoriesController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/listCategories", allCategories);
router.post("/getCategory", authMiddleware, getCategory);
router.put("/changeCategory", authMiddleware, changeCategory);
router.get("/categoriesPagination", categoriesPagination);

module.exports = router;
