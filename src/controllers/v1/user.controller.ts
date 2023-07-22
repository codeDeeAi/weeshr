import { Request, Response } from 'express';
const { validate } = require("../../../utils/validator");
const { makeUserValidation } = require("./validations/userValidations");
import User from "../../models/User.model";


/**
 * Make User An Admin
 * @param {Request} req
 * @param {Response} res
 * @return {Response}
 */
module.exports.makeAdmin = [validate(makeUserValidation), async (req: Request, res: Response) => {

    const { id } = req.body;

    try {

        const user = await User.findOneAndUpdate(
            { _id: id },
            { $set: { role: "admin" } },
            { new: true }
        );

        if (!user) {

            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: "User made an admin" });

    } catch (error) {

        return res.status(500).json({ message: "Error making user an admin", error });

    }
}];

/**
 * Make User A User
 * @param {Request} req
 * @param {Response} res
 * @return {Response}
 */
module.exports.makeUser = [validate(makeUserValidation), async (req: Request, res: Response) => {

    const { id } = req.body;

    try {

        const user = await User.findOneAndUpdate(
            { _id: id },
            { $set: { role: "user" } },
            { new: true }
        );

        if (!user) {

            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: "User made a user" });

    } catch (error) {

        return res.status(500).json({ message: "Error making user a user", error });

    }
}];