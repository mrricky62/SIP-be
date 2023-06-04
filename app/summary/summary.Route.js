const express = require("express");
const { GetSummary } = require("./summary.Controller");
const router = express.Router();

router.get("/", GetSummary);

module.exports = router;
