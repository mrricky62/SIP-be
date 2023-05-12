const { CreateUangLemburMiddleware } = require("./uang-lembur.Middleware");
const {
  CreateUangLembur,
  GetUangLembur,
  GetUangLemburById,
} = require("./uang-lembur.Controller");

const express = require("express");
const router = express.Router();

router.get("/", GetUangLembur);
router.get("/:id", GetUangLemburById);

router.post("/", CreateUangLemburMiddleware, CreateUangLembur);

module.exports = router;
