const {
  CreateGaji,
  GetGaji,
  GetGajiById,
  EditGaji,
  DeleteGaji,
} = require("./gaji.Controller");
const {
  CreateGajiMiddleware,
  EditGajiMiddleware,
  DeleteGajiMiddleware,
} = require("./gaji.MIddleware");

const express = require("express");
const router = express.Router();

router.get("/", GetGaji);
router.get("/:id", GetGajiById);

router.post("/", CreateGajiMiddleware, CreateGaji);

router.put("/:id", EditGajiMiddleware, EditGaji);

router.delete("/:id", DeleteGajiMiddleware, DeleteGaji);

module.exports = router;
