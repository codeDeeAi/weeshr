import { Request, Response } from 'express';
const { validate } = require("../../../utils/validator");
const { loginValidation, registerValidation } = require("./validations/authValidations");
import User from "../../models/User.model";
const bcrypt = require("bcrypt");
const {
    accessToken,
    refreshToken,
    jwt
} = require('../../../utils/jwt');


/**
 * Login User
 * @param {Request} req
 * @param {Response} res
 * @return {Response}
 */
module.exports.login = [validate(loginValidation), async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });

        if (!user)
            return res.status(400).json({ message: "User not found" });

        const passwordCheck = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordCheck)
            return res.status(400).json({ message: "User not found" });

        const token = jwt.sign(email, accessToken);

        return res.status(200).json({
            message: "User logged in successfully", user: {
                name: user.name,
                email: user.email,
                token: token
            }
        });

    } catch (error) {

        return res.status(500).json({ message: "Error saving blog", error });
    }
}];

/**
 * Register User
 * @param {Request} req
 * @param {Response} res
 * @return {Response}
 */
module.exports.register = [validate(registerValidation), async (req: Request, res: Response) => {

    try {
        const { name, email, password } = req.body;

        // Encrypt user password (Hash password)
        const salt = await bcrypt.genSalt();
        const hashed_pasword = await bcrypt.hash(password, salt);

        const newUser = {
            name: name,
            email: email,
            password: hashed_pasword,
            role: null
        };

        const user = await new User(newUser).save();

        return res.status(200).json({
            message: "User registered successfully !", user: {
                name: user.name,
                email: user.email,
            }
        });

    } catch (error) {

        return res.status(500).json({ message: "Error creating user", error });
    }
}];
