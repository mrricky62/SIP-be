const {
  CreateUangLemburMiddleware,
  EditUangLemburMiddleware,
  DeleteUangLemburMiddleware,
  ImportUangLemburMiddleware,
} = require("./uang-lembur.Middleware");
const {
  CreateUangLembur,
  GetUangLembur,
  GetUangLemburById,
  EditUangLembur,
  DeleteUangLembur,
  ImportUangLembur,
} = require("./uang-lembur.Controller");

const express = require("express");
const router = express.Router();

router.get("/", GetUangLembur);
router.get("/:id", GetUangLemburById);

router.post("/", CreateUangLemburMiddleware, CreateUangLembur);
router.post("/import", ImportUangLemburMiddleware, ImportUangLembur);

router.put("/:id", EditUangLemburMiddleware, EditUangLembur);

router.delete("/:id", DeleteUangLemburMiddleware, DeleteUangLembur);

module.exports = router;
