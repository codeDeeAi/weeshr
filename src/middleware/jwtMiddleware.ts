import { Request, Response, NextFunction } from 'express';
const {
    accessToken,
    refreshToken,
    jwt
} = require('../../utils/jwt');

/**
 * Check if Request has bearer token
 * @param req 
 * @param res 
 * @param next 
 */
const jwtAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { authorization, Authorization } = req.headers

    const bearer = (authorization) ? String(authorization) : (Authorization) ? String(Authorization) : null;

    if (bearer == null) return res.status(401).json({ message: "Not authenticated !" });

    const splitBearer: String[] = bearer.split(' ');

    const bearerToken: String = (splitBearer[1]) ? String(splitBearer[1]) : '';

    jwt.verify(bearerToken, accessToken, (err: any, user: any) => {
        if (err) return res.status(403).json({ message: "Not authorized !" });
        req.body['auth_user'] = user;
        next();
    });
};


module.exports = {
    jwtAuthMiddleware
}