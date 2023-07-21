const express = require("express");

const {
  listBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  seedBlog
} = require("../../../controllers/v1/blog.controller");

const router = express.Router();

router.get("/blogs", listBlogs);
router.post("/blog", createBlog);
router.route("/blog/:id")
  .get(getBlog)
  .patch(updateBlog)
  .delete(deleteBlog);
router.get("/blogs/seed", seedBlog);

module.exports = router;
