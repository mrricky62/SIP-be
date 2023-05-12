const express = require("express");
const { CreateSPDMiddleware } = require("./spd.Middleware");
const { CreateSPD } = require("./spd.Controller");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});
router.post("/", CreateSPDMiddleware, CreateSPD);

module.exports = router;
