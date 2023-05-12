const {
  CreateTunjangan,
  GetTunjangan,
  GetTunjanganById,
  EditTunjangan,
} = require("./tunjangan.Controller");
const {
  CreateTunjanganMiddleware,
  EditTunjanganMiddleware,
} = require("./tunjangan.Middleware");

const express = require("express");
const router = express.Router();

router.get("/", GetTunjangan);
router.get("/:id", GetTunjanganById);

router.post("/", CreateTunjanganMiddleware, CreateTunjangan);

router.put("/:id", EditTunjanganMiddleware, EditTunjangan);

module.exports = router;
