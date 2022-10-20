import { Request, Response, NextFunction, response } from "express"
import { UsersRepositories } from "../repositories/UsersRepositories";

export const ensureAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { user_id } = req;
    const usersRepositories = UsersRepositories;
    const { admin } = await usersRepositories.findOneByOrFail({ id: user_id })
    if(admin) return next();
    return res.status(401).json({ message: "Unauthorized" });
}