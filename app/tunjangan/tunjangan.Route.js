const { CreateTunjangan } = require("./tunjangan.Controller");
const { CreateTunjanganMiddleware } = require("./tunjangan.Middleware");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

router.post("/", CreateTunjanganMiddleware, CreateTunjangan);

module.exports = router;
