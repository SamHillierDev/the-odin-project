const express = require("express");
const app = express();
const indexRouter = require("./routes/index");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
