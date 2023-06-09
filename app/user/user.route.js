const {
  GetUser,
  GetUserById,
  EditUser,
  GetUserNotAdmin,
} = require("./user.controller");
const { EditUserMiddleware } = require("./user.middleware");

const express = require("express");
const router = express.Router();

router.get("/", GetUser);
router.get("/list", GetUserNotAdmin);

router.get("/:id", GetUserById);

router.put("/:id", EditUserMiddleware, EditUser);

module.exports = router;
