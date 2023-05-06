const { GetUser } = require("./user.controller");

const express = require("express");
const router = express.Router();

router.get("/", GetUser);

module.exports = router;
