const {
  CreateSPDMiddleware,
  EditSPDMiddleware,
  ImportSPDMiddleware,
} = require("./spd.Middleware");
const {
  CreateSPD,
  GetSPD,
  GetSPDById,
  ApproveSPD,
  RejectSPD,
  EditSPD,
  DeleteSPD,
  ImportSPD,
} = require("./spd.Controller");

const express = require("express");
const router = express.Router();

const path = require("path");
const multer = require("multer");

const Storage = multer.diskStorage({
  destination: "public/documents/",
  filename: (_req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const UploadDoc = multer({
  storage: Storage,
}).fields([{ name: "filepath", maxCount: 1 }]);

router.get("/", GetSPD);
router.get("/:id", GetSPDById);

router.post("/", UploadDoc, CreateSPDMiddleware, CreateSPD);
router.post("/import", ImportSPDMiddleware, ImportSPD);

router.put("/approve/:id", EditSPDMiddleware, ApproveSPD);
router.put("/reject/:id", EditSPDMiddleware, RejectSPD);

router.put("/:id", UploadDoc, EditSPDMiddleware, EditSPD);

router.delete("/:id", DeleteSPD);

module.exports = router;
