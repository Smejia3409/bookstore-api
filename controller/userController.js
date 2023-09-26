const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json("Please fill in all fields (name, email, password)");
    }

    //check for existing email
    const checkEmail = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (checkEmail) {
      res.status(200).json("Email is already used, please use another one");
    } else {
      //hash password
      //encrypts password user enters
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await db.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
        },
      });

      if (user) {
        res.status(200).json({
          name: name,
          email: email,
          token: generateToken(user.id),
        });
      } else {
        res.status(400).json({
          message: "Invalid data",
        });
        console.log("error");
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if account with email exist
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        email: email,
        token: generateToken(user.id),
      });

      console.log("Login successful");
    } else {
      res.status(400);
      res.json("invalid user");
      throw new Error("invalid user data");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

//gets the user data
const getUser = async (req, res) => {
  const { id, name, email } = req.user;

  // data being returned in getUser using token
  res.status(200).json({
    id: id,
    name,
    email,
  });
};

const generateToken = (id) => {
  return jwt.sign({ id }, "abc123", {
    expiresIn: "30d",
  });
};

module.exports = { createUser, userLogin, getUser };
