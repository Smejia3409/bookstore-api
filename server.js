const express = require("express");

const authorRoutes = require("./routes/authorRoutes");

const port = 5000;

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/author", authorRoutes);

app.listen(port, () => {
  console.log(`Server started in port: ${port}`);
});
