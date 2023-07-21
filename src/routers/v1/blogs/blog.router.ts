const express = require("express");

const {
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog
} = require("../../../controllers/v1/blog.controller");

const router = express.Router();

// router.get("/blogs", createBlog);
router.post("/blog", createBlog);
router.route("/blog/:id")
  .get(getBlog)
  .patch(updateBlog)
  .delete(deleteBlog);

module.exports = router;
