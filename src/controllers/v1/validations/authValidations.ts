import { body, query, param } from 'express-validator';
import User from '../../../models/User.model';

const loginValidation: Array<any> = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .custom(async (value) => {
            let query = await User.findOne({
                email: value,
            });

            if (!query)
                return Promise.reject("Record not found !");
        }),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required'),
];

const registerValidation: Array<any> = [
    body('name')
        .trim()
        .notEmpty()
        .isLength({ max: 200 })
        .withMessage('Name is required'),
    body('email')
        .trim()
        .isEmail()
        .notEmpty()
        .withMessage('Email is required')
        .custom(async (value) => {
            let query = await User.findOne({
                email: value,
            });

            if (query)
                return Promise.reject("User exists !");
        }),
    body('password')
        .trim()
        .notEmpty()
        .isLength({ min: 6, max: 20 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/)
        .withMessage('Password must contain at least one lowercase letter')
        .matches(/\d/)
        .withMessage('Password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage('Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)'),
];

module.exports = {
    loginValidation,
    registerValidation
};