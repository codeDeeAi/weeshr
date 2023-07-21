import { Request, Response } from 'express';
import express from 'express';
import { validationResult, ValidationChain } from 'express-validator';

/**
 * Throw validation Error
 * @param {Request} req
 * @param {Response} res
 * @return {Response|Void}
 */
module.exports.throwValidatorError = (req: Request, res: Response): Response | void => {

    const result = validationResult(req);

    if (!result.isEmpty())
        return res.status(422).json({ errors: result.array() });

}

// sequential processing, stops running validations chain if the previous one fails.
module.exports.validate = (validations: ValidationChain[]) => {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        for (let validation of validations) {
            console.log(validation)
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                return res.status(422).json({ errors: result.array() });
            }
        }

        // If no errors, proceed to the next middleware or route handler
        next();
    };
};
