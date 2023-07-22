import { body, query, param } from 'express-validator';
import User from '../../../models/User.model';
import mongoose from 'mongoose';

const makeUserValidation = [
    body('id')
        .exists()
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return Promise.reject('Invalid user ID format');
            }
        })
        .custom(async (value) => {
            let query = await User.findOne({
                _id: value,
            });

            if (!query)
                return Promise.reject("User doesn't exist !");
        }),
];

module.exports = {
    makeUserValidation
};