import { Request, Response } from 'express';
const { validate } = require("../../../utils/validator");
const { createValidation, idValidation, updateValidation, listValidation } = require("./validations/blogValidations");
import Blog from "../../models/Blog.model";
import { type IBlog } from '../../types/allTypes';
import blogSeedData from '../../../utils/blogseeder';

/**
 * List all Blog Posts
 * @param {Request} req
 * @param {Response} res
 * @return {Response}
 */
module.exports.listBlogs = [validate(listValidation), async (req: Request, res: Response) => {

    try {
        const {
            page,
            per_page } = req.query;

        const page_no: number = (page) ? Number(page) : 1;
        const blogs_per_page: number = (per_page) ? Number(per_page) : 10;

        const skip: number = (page_no - 1) * blogs_per_page;

        const blogs = await Blog.find().skip(skip).limit(blogs_per_page);

        return res.status(200).json({ message: "Blogs fetched", blogs: blogs, page_no, blogs_per_page });

    } catch (error) {

        return res.status(500).json({ message: "Error fetching blogs", error });
    }
}];

/**
 * Create New Blog Post
 * @param {Request} req
 * @param {Response} res
 * @return {Response}
 */
module.exports.createBlog = [validate(createValidation), async (req: Request, res: Response) => {

    try {
        const { title, content, author, publicationDate } = req.body;

        const newBlog: IBlog = {
            title: title,
            content: content,
            author: author,
            publicationDate: new Date(publicationDate)
        };

        const result = await new Blog(newBlog).save();

        return res.status(200).json({ message: "Done", blog: result });

    } catch (error) {

        return res.status(500).json({ message: "Error saving blog", error });
    }
}];

/**
 * Retrieve a Blog Post
 * @param {Request} req
 * @param {Response} res
 * @return {Response}
 */
module.exports.getBlog = [validate(idValidation), async (req: Request, res: Response) => {

    const { id } = req.params;

    try {

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        return res.status(200).json({ message: "Blog fetched", blog: blog });

    } catch (error) {

        return res.status(500).json({ message: "Error finding blog", error });

    }

}];

/**
 * Update a Blog Post
 * @param {Request} req
 * @param {Response} res
 * @return {Response}
 */
module.exports.updateBlog = [validate(updateValidation), async (req: Request, res: Response) => {

    const { id } = req.params;

    try {

        const { title, content, author, publicationDate } = req.body;

        const data = {
            title: title,
            content: content,
            author: author,
            publicationDate: new Date(publicationDate)
        };

        const blog = await Blog.findOneAndUpdate(
            { _id: id },
            { $set: data },
            { new: true }
        );

        if (!blog) {

            return res.status(404).json({ message: 'Blog not found' });
        }

        return res.status(200).json({ message: "Blog updated", blog: blog });

    } catch (error) {

        return res.status(500).json({ message: "Error updating blog", error });

    }

}];

/**
 * Delete a Blog Post
 * @param {Request} req
 * @param {Response} res
 * @return {Response}
 */
module.exports.deleteBlog = [validate(idValidation), async (req: Request, res: Response) => {

    const { id } = req.params;

    try {

        const blog = await Blog.deleteOne({ _id: id });

        if (blog.deletedCount === 0) {

            return res.status(404).json({ message: 'Blog not found' });
        }

        return res.status(201).json({ message: "Blog deleted" });

    } catch (error) {

        return res.status(500).json({ message: "Error deleting the blog", error });

    }

}];

/**
 * Seed Database
 * @param {Request} req
 * @param {Response} res
 * @return {Response}
 */
module.exports.seedBlog = async (req: Request, res: Response) => {

    try {

        await Blog.insertMany(blogSeedData);

        return res.status(201).json({ message: "Blog table seeding completed" });

    } catch (error) {

        return res.status(500).json({ message: "Error seeding blog table", error });

    }
};
