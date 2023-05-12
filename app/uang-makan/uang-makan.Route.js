const express = require("express");
const { CreateUangMakanMiddleware } = require("./uang-makan.Middleware");
const { CreateUangMakan, GetUangMakan } = require("./uang-makan.Controller");
const router = express.Router();

router.get("/", GetUangMakan);
router.post("/", CreateUangMakanMiddleware, CreateUangMakan);

module.exports = router;
