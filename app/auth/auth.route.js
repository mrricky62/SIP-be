const { RegisterMiddleware, LoginMiddleware } = require("./auth.middleware");
const { Register, Login } = require("./auth.controller");
const express = require("express");
const router = express.Router();

router.post("/register", RegisterMiddleware, Register);
router.post("/login", LoginMiddleware, Login);

module.exports = router;
