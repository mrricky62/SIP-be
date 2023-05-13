const {
  CreateGaji,
  GetGaji,
  GetGajiById,
  EditGaji,
  DeleteGaji,
  ImportGaji,
} = require("./gaji.Controller");
const {
  CreateGajiMiddleware,
  EditGajiMiddleware,
  DeleteGajiMiddleware,
  ImportGajiMiddleware,
} = require("./gaji.Middleware");

const express = require("express");
const router = express.Router();

router.get("/", GetGaji);
router.get("/:id", GetGajiById);

router.post("/", CreateGajiMiddleware, CreateGaji);
router.post("/import", ImportGajiMiddleware, ImportGaji);

router.put("/:id", EditGajiMiddleware, EditGaji);

router.delete("/:id", DeleteGajiMiddleware, DeleteGaji);

module.exports = router;
