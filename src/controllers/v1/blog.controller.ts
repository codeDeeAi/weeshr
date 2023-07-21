import { Request, Response } from 'express';
const { validate } = require("../../../utils/validator");
const { createValidation, idValidation, updateValidation } = require("./validations/blogValidations");
import Blog from "../../models/Blog.model";
import { type IBlog } from '../../types/allTypes';

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
