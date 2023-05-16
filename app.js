const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();
const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json({ limit: "100mb" }));

require("./routes")(app);
app.get("/documents", express.static("public/documents"));

const port = process.env.API_PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;
