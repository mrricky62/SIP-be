const {
  CreateTunjangan,
  GetTunjangan,
  GetTunjanganById,
  EditTunjangan,
  DeleteTunjangan,
  ImportTunjangan,
} = require("./tunjangan.Controller");
const {
  CreateTunjanganMiddleware,
  EditTunjanganMiddleware,
  DeleteTunjanganMiddleware,
  ImportTunjanganMiddleware,
} = require("./tunjangan.Middleware");

const express = require("express");
const router = express.Router();

router.get("/", GetTunjangan);
router.get("/:id", GetTunjanganById);

router.post("/", CreateTunjanganMiddleware, CreateTunjangan);
router.post("/import", ImportTunjanganMiddleware, ImportTunjangan);

router.put("/:id", EditTunjanganMiddleware, EditTunjangan);

router.delete("/:id", DeleteTunjanganMiddleware, DeleteTunjangan);

module.exports = router;
