import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config/configs";

interface UserPayload {
    id: string;
    name: string;
}

// add currentUser definition to req object
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    const jwtHeader = req.get("jwt");
    if (!jwtHeader) return next();

    try {
        const payload = jwt.verify(jwtHeader, JWT_KEY) as UserPayload;
        req.currentUser = payload;
    } catch (err) {
        console.info("jwt malformed");
        return next();
        // return res.send({ currentUser: null });
    }
    next();
};
