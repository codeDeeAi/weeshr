import express from "express";
const { jwtAuthMiddleware } = require('../../../../src/middleware/jwtMiddleware');

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
  .patch(jwtAuthMiddleware, updateBlog)
  .delete(deleteBlog);
router.get("/blogs/seed", seedBlog);

module.exports = router;
