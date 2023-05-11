const { CreateGaji, GetGaji } = require("./gaji.Controller");
const { CreateGajiMiddleware } = require("./gaji.MIddleware");

const express = require("express");
const router = express.Router();

router.get("/", GetGaji);
router.post("/", CreateGajiMiddleware, CreateGaji);

module.exports = router;
