import { body, query, param } from 'express-validator';
import Blog from '../../../models/Blog.model';
import mongoose from 'mongoose';

const idValidation = [
    param('id')
        .trim()
        .notEmpty()
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return Promise.reject('Invalid blog ID format');
            }
        })
];

const idExistsValidation = [
    param('id')
        .exists()
        .custom(async (value) => {
            let query = await Blog.findOne({
                _id: value,
            });

            if (!query)
                return Promise.reject("Bad request/ Invalid ID !");
        }),
];

const createValidation: Array<any> = [
    body('title')
        .trim()
        .notEmpty()
        .isLength({ max: 500 })
        .withMessage('Title is required'),
    body('content')
        .trim()
        .notEmpty()
        .isLength({ max: 10000 })
        .withMessage('Content is required'),
    body('author')
        .trim()
        .notEmpty()
        .isLength({ max: 500 })
        .withMessage('Author is required'),
    body('publicationDate')
        .notEmpty()
        .withMessage('Publication date is required')
        .isISO8601()
        .withMessage('Invalid date format. Must be in ISO8601 format (YYYY-MM-DD)'),
];

const updateValidation: Array<any> = [
    ...idValidation,
    body('title')
        .trim()
        .notEmpty()
        .isLength({ max: 500 })
        .withMessage('Title is required'),
    body('content')
        .trim()
        .notEmpty()
        .isLength({ max: 10000 })
        .withMessage('Content is required'),
    body('author')
        .trim()
        .notEmpty()
        .isLength({ max: 500 })
        .withMessage('Author is required'),
    body('publicationDate')
        .notEmpty()
        .withMessage('Publication date is required')
        .isISO8601()
        .withMessage('Invalid date format. Must be in ISO8601 format (YYYY-MM-DD)'),
];


module.exports = {
    createValidation,
    idValidation,
    idExistsValidation,
    updateValidation
};