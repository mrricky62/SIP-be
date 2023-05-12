const { CreateUangLemburMiddleware } = require("./uang-lembur.Middleware");
const { CreateUangLembur, GetUangLembur } = require("./uang-lembur.Controller");

const express = require("express");
const router = express.Router();

router.get("/", GetUangLembur);
router.post("/", CreateUangLemburMiddleware, CreateUangLembur);

module.exports = router;
