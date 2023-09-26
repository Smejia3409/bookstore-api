const db = require("../config/db");

const allCategories = async (req, res) => {
  try {
    const categories = await db.categories.findMany({
      select: {
        id: true,
        category: true,
        book: {
          select: {
            title: true,
            id: true,
          },
        },
      },
    });

    if (categories) {
      res.status(200).json(categories);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const getCategory = async (req, res) => {
  try {
    const { category } = req.body;

    const list = await db.categories.findMany({
      where: {
        category: category,
      },
    });

    if (list) {
      res.status(200).json(list);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const changeCategory = async (req, res) => {
  try {
    const { id, newCategory } = req.body;

    if (!id || !newCategory) {
      throw new Error("Please fill in all fields (id, newCategory)");
    }

    const category = await db.categories.update({
      where: { id: parseInt(id) },
      data: {
        category: newCategory,
      },
    });

    if (category) {
      res.status(200).json("category changed");
      console.log(category);
      console.log(newCategory);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const categoriesPagination = async (req, res) => {
  try {
    const category = await db.categories.findMany({
      skip: parseInt(req.query.skip),
      take: parseInt(req.query.take),
    });

    if (category) {
      res.status(200).json(category);
    } else {
      res.status(400).json("No results found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("Error");
  }
};

module.exports = {
  allCategories,
  getCategory,
  changeCategory,
  categoriesPagination,
};
