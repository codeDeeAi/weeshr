const express = require("express");

const {
  getBlog,
  createBlog
} = require("../../../controllers/v1/blog.controller");

const router = express.Router();

// router.get("/blogs", createBlog);
router.post("/blog", createBlog);
router.route("/blog/:id")
  .get(getBlog)
// .patch()
// .delete();

module.exports = router;
