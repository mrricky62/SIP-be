const {
  RegisterMiddleware,
  LoginMiddleware,
  ChangePasswordMiddleware,
} = require("./auth.middleware");
const { Register, Login, ChangePassword } = require("./auth.controller");
const express = require("express");
const { AuthToken } = require("../../shared/middleware.shared");
const router = express.Router();

router.post("/register", RegisterMiddleware, Register);
router.post("/login", LoginMiddleware, Login);
router.post(
  "/change-password",
  AuthToken,
  ChangePasswordMiddleware,
  ChangePassword
);

module.exports = router;
