const express = require("express");
const router = express.Router();

const {
  allCategories,
  getCategory,
  changeCategory,
} = require("../controller/categoriesController");

router.get("/listCategories", allCategories);
router.post("/getCategory", getCategory);
router.put("/changeCategory", changeCategory);

module.exports = router;
