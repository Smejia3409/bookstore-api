const db = require("../config/db");

const createBook = async (req, res) => {
  try {
    const { title, category, id } = req.body;

    if (!title || !category || !id) {
      throw new Error("Please fill in all fields (title, category)");
    }

    const book = await db.book.create({
      data: {
        title: title,
        authorId: parseInt(id),
        Categories: {
          create: {
            category: category,
          },
        },
      },
    });

    if (book) {
      res.status(200).json(book);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await db.book.findMany({
      select: {
        id: true,
        title: true,
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (books.length !== 0) {
      res.status(200).json(books);
    } else {
      res.status(400).json("No books");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const getBook = async (req, res) => {
  const { id } = req.body;
  try {
    const book = await db.book.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (book) {
      res.status(200).json(book);
    } else {
      res.status(400).json("Book not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await db.book.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (book != 0) {
      res.status(200).json(book);
    } else {
      res.status(400).json("Book not found");
      throw new Error("Book not found");
    }
  } catch (error) {
    console.log("error ran");
    console.log(error);
    res.status(400).json(error.meta["cause"]);
  }
};

const booksByAuthor = async (req, res) => {
  try {
    const books = await db.book.findMany({
      where: {
        author: {
          firstName: req.query.firstName,
          lastName: req.query.lastName,
        },
      },
    });

    if (books) {
      console.log(books);
      res.status(200).json(books);
    } else {
      console.log("No results found");
      res.status(400).json("No results found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("Error");
  }
};

const booksByCategory = async (req, res) => {
  try {
    const books = await db.book.findMany({
      where: {
        Categories: {
          some: {
            category: req.params.category,
          },
        },
      },
    });

    if (books) {
      res.status(200).json(books);
    } else {
      res.status(400).json("No results found");
    }
  } catch (error) {
    res.status(400).json("Error");
  }
};

const booksPagination = async (req, res) => {
  try {
    const books = await db.book.findMany({
      skip: parseInt(req.query.skip),
      take: parseInt(req.query.take),
    });

    if (books) {
      res.status(200).json(books);
    } else {
      res.status(400).json("No results found");
    }
  } catch (error) {
    res.status(400).json("Error");
  }
};

module.exports = {
  createBook,
  getBooks,
  getBook,
  deleteBook,
  booksByAuthor,
  booksByCategory,
  booksPagination,
};
