const { CreateGaji } = require("./gaji.Controller");
const { CreateGajiMiddleware } = require("./gaji.MIddleware");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Gaji route" });
});
router.post("/", CreateGajiMiddleware, CreateGaji);

module.exports = router;
