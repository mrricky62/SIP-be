const {
  CreateTunjangan,
  GetTunjangan,
  GetTunjanganById,
  EditTunjangan,
  DeleteTunjangan,
  ImportTunjangan,
  ImportTunjanganPotongan,
} = require("./tunjangan.Controller");
const {
  CreateTunjanganMiddleware,
  EditTunjanganMiddleware,
  DeleteTunjanganMiddleware,
  ImportTunjanganMiddleware,
  ImportTunjanganPotonganMiddleware,
} = require("./tunjangan.Middleware");

const express = require("express");
const router = express.Router();

router.get("/", GetTunjangan);
router.get("/:id", GetTunjanganById);

router.post("/", CreateTunjanganMiddleware, CreateTunjangan);
router.post("/import", ImportTunjanganMiddleware, ImportTunjangan);
router.post(
  "/import-potongan",
  ImportTunjanganPotonganMiddleware,
  ImportTunjanganPotongan
);

router.put("/:id", EditTunjanganMiddleware, EditTunjangan);

router.delete("/:id", DeleteTunjanganMiddleware, DeleteTunjangan);

module.exports = router;
