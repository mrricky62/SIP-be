const express = require("express");
const { CreateUangMakanMiddleware } = require("./uang-makan.Middleware");
const { CreateUangMakan } = require("./uang-makan.Controller");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Uang Makan");
});
router.post("/", CreateUangMakanMiddleware, CreateUangMakan);

module.exports = router;
