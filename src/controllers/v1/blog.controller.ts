import { Request, Response } from 'express';
const { validate } = require("../../../utils/validator");
const { createValidation, idValidation } = require("./validations/blogValidations");
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

        return res.status(201).json({ message: "Done", result });

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
            throw new Error('Blog not found');
        }

        return res.status(201).json({ message: "Blog fetched", blog: blog });

    } catch (error) {

        return res.status(500).json({ message: "Error finding blog", error });

    }

}];
