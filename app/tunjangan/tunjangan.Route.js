const {
  CreateTunjangan,
  GetTunjangan,
  GetTunjanganById,
} = require("./tunjangan.Controller");
const { CreateTunjanganMiddleware } = require("./tunjangan.Middleware");

const express = require("express");
const router = express.Router();

router.get("/", GetTunjangan);
router.get("/:id", GetTunjanganById);

router.post("/", CreateTunjanganMiddleware, CreateTunjangan);

module.exports = router;
