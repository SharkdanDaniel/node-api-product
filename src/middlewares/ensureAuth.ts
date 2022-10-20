import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export const ensureAuth = (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization;
    if(!authToken) return res.status(401).json({ status: 401, message: "Unauthorized" });
    const [ _, token ] = authToken.split(" ");
    try {
        const { sub } = verify(token, "c49cfe9b8595f44183680fa21dc75fb5");
        (req as any).user_id = sub as string;
        return next();
    } catch (error) {
        return res.status(401).json({ status: 401, message: "Unauthorized" });
    }
}