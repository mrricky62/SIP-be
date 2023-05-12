const { CreateUangLemburMiddleware } = require("./uang-lembur.Middleware");
const { CreateUangLembur } = require("./uang-lembur.Controller");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});
router.post("/", CreateUangLemburMiddleware, CreateUangLembur);

module.exports = router;
