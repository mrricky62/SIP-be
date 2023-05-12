const express = require("express");
const {
  CreateUangMakanMiddleware,
  EditUangMakanMiddleware,
} = require("./uang-makan.Middleware");
const {
  CreateUangMakan,
  GetUangMakan,
  GetUangMakanById,
  EditUangMakan,
} = require("./uang-makan.Controller");
const router = express.Router();

router.get("/", GetUangMakan);
router.get("/:id", GetUangMakanById);

router.post("/", CreateUangMakanMiddleware, CreateUangMakan);

router.put("/:id", EditUangMakanMiddleware, EditUangMakan);

module.exports = router;
