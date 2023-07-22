import express from "express";

const { jwtAuthMiddleware } = require('../../../../src/middleware/jwtMiddleware');
const { adminMiddleware } = require('../../../../src/middleware/roleMiddleware');
const {
  makeAdmin,
  makeUser
} = require("../../../controllers/v1/user.controller");

const router = express.Router();

router.post("/make-admin", jwtAuthMiddleware, adminMiddleware, makeAdmin);
router.post("/make-user", jwtAuthMiddleware, adminMiddleware, makeUser);

module.exports = router;
