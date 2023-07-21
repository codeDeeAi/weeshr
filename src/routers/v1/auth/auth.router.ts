import express from "express";

const {
  login,
  register
} = require("../../../controllers/v1/auth.controller");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

module.exports = router;
