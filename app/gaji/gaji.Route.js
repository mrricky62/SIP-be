const { CreateGaji, GetGaji, GetGajiById } = require("./gaji.Controller");
const { CreateGajiMiddleware } = require("./gaji.MIddleware");

const express = require("express");
const router = express.Router();

router.get("/", GetGaji);
router.get("/:id", GetGajiById);
router.post("/", CreateGajiMiddleware, CreateGaji);

module.exports = router;
