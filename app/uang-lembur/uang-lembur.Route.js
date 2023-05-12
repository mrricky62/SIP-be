const {
  CreateUangLemburMiddleware,
  EditUangLemburMiddleware,
  DeleteUangLemburMiddleware,
} = require("./uang-lembur.Middleware");
const {
  CreateUangLembur,
  GetUangLembur,
  GetUangLemburById,
  EditUangLembur,
  DeleteUangLembur,
} = require("./uang-lembur.Controller");

const express = require("express");
const router = express.Router();

router.get("/", GetUangLembur);
router.get("/:id", GetUangLemburById);

router.post("/", CreateUangLemburMiddleware, CreateUangLembur);

router.put("/:id", EditUangLemburMiddleware, EditUangLembur);

router.delete("/:id", DeleteUangLemburMiddleware, DeleteUangLembur);

module.exports = router;
