const {
  CreateGaji,
  GetGaji,
  GetGajiById,
  EditGaji,
} = require("./gaji.Controller");
const {
  CreateGajiMiddleware,
  EditGajiMiddleware,
} = require("./gaji.MIddleware");

const express = require("express");
const router = express.Router();

router.get("/", GetGaji);
router.get("/:id", GetGajiById);

router.post("/", CreateGajiMiddleware, CreateGaji);

router.put("/:id", EditGajiMiddleware, EditGaji);

module.exports = router;
