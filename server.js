const express = require("express");

const authorRoutes = require("./routes/authorRoutes");
const bookRouter = require("./routes/bookRoutes");
const categoriesRouter = require("./routes/categoryRoutes");
const userRouter = require("./routes/userRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const port = 5000;

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorMiddleware);

app.use("/author", authorRoutes);
app.use("/book", bookRouter);
app.use("/category", categoriesRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server started in port: ${port}`);
});
