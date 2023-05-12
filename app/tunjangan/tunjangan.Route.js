const {
  CreateTunjangan,
  GetTunjangan,
  GetTunjanganById,
  EditTunjangan,
  DeleteTunjangan,
} = require("./tunjangan.Controller");
const {
  CreateTunjanganMiddleware,
  EditTunjanganMiddleware,
  DeleteTunjanganMiddleware,
} = require("./tunjangan.Middleware");

const express = require("express");
const router = express.Router();

router.get("/", GetTunjangan);
router.get("/:id", GetTunjanganById);

router.post("/", CreateTunjanganMiddleware, CreateTunjangan);

router.put("/:id", EditTunjanganMiddleware, EditTunjangan);

router.delete("/:id", DeleteTunjanganMiddleware, DeleteTunjangan);

module.exports = router;
