const { GetUser, GetUserById } = require("./user.controller");

const express = require("express");
const router = express.Router();

router.get("/", GetUser);
router.get("/:id", GetUserById);

module.exports = router;
