const { CreateSPDMiddleware } = require("./spd.Middleware");
const { CreateSPD } = require("./spd.Controller");

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

router.get("/", (req, res) => {
  res.send("Hello World");
});
router.post("/", UploadDoc, CreateSPDMiddleware, CreateSPD);

module.exports = router;
