import { Request, Response, NextFunction } from 'express';

/**
 * Check if user is admin
 * @param req 
 * @param res 
 * @param next 
 */
const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { auth_user } = req.body

    if (auth_user == null) return res.status(401).json({ message: "Not authenticated !" });

    if (auth_user.role !== 'admin') return res.status(403).json({ message: "Not authorized !" });

    next();
};

/**
 * Check if user is user
 * @param req 
 * @param res 
 * @param next 
 */
const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { auth_user } = req.body

    if (auth_user == null) return res.status(401).json({ message: "Not authenticated !" });

    if (auth_user.role !== 'user') return res.status(403).json({ message: "Not authorized !" });

    next();
};

module.exports = {
    adminMiddleware,
    userMiddleware
}