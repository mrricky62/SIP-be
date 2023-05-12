const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Uang Makan");
});

module.exports = router;
