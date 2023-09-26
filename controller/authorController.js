const db = require("../config/db");

const getAuthor = async (req, res) => {
  const { id } = req.body;

  try {
    if (!id) {
      res.status(400).json("Please fill in all fields");
      throw new Error("Please fill in all fields");
    }

    //checks if author already exist
    const checkForAuthor = await db.author.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    });

    if (checkForAuthor) {
      res.status(200).json(checkForAuthor);
    } else {
      res.status(400).json("Author doesnt exist");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const getAuthors = async (req, res) => {
  try {
    const authors = await db.author.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    });

    res.status(200).json(authors);
  } catch (error) {
    res.status(400).json(error);
  }
};

const createAuthor = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    if (!firstName || !lastName) {
      res.status(400).json("Please fill in all fields");
    } else {
      const author = await db.author.create({
        data: {
          firstName: firstName,
          lastName: lastName,
        },
      });

      res.status(200).json(author);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteAuthor = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    const author = await db.author.delete({
      where: {
        id: id,
      },
    });

    if (author) {
      res.status(200).json(`Author is deleted`);
    } else {
      res.status(400).json("Author wasnt found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports = { getAuthor, getAuthors, createAuthor, deleteAuthor };
