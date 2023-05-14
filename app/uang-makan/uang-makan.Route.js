const express = require("express");
const {
  CreateUangMakanMiddleware,
  EditUangMakanMiddleware,
  DeleteUangMakanMiddleware,
  ImportUangMakanMiddleware,
} = require("./uang-makan.Middleware");
const {
  CreateUangMakan,
  GetUangMakan,
  GetUangMakanById,
  EditUangMakan,
  DeleteUangMakan,
  ImportUangMakan,
} = require("./uang-makan.Controller");
const router = express.Router();

router.get("/", GetUangMakan);
router.get("/:id", GetUangMakanById);

router.post("/", CreateUangMakanMiddleware, CreateUangMakan);
router.post("/import", ImportUangMakanMiddleware, ImportUangMakan);

router.put("/:id", EditUangMakanMiddleware, EditUangMakan);

router.delete("/:id", DeleteUangMakanMiddleware, DeleteUangMakan);

module.exports = router;
