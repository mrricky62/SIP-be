const express = require("express");
const {
  CreateUangMakanMiddleware,
  EditUangMakanMiddleware,
  DeleteUangMakanMiddleware,
} = require("./uang-makan.Middleware");
const {
  CreateUangMakan,
  GetUangMakan,
  GetUangMakanById,
  EditUangMakan,
  DeleteUangMakan,
} = require("./uang-makan.Controller");
const router = express.Router();

router.get("/", GetUangMakan);
router.get("/:id", GetUangMakanById);

router.post("/", CreateUangMakanMiddleware, CreateUangMakan);

router.put("/:id", EditUangMakanMiddleware, EditUangMakan);

router.delete("/:id", DeleteUangMakanMiddleware, DeleteUangMakan);

module.exports = router;
