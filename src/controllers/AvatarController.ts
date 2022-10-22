import { Request, Response } from "express";
import { AvatarService } from "../services/AvatarService";

export class AvatarController {
    async getById(req: Request, res: Response) {
        const { id } = req.params;
        const avatarService = new AvatarService();
        const avatar = await avatarService.getById(id);
        return res.json(avatar);
    }

    async create(req: Request, res: Response) {
        const { image } = req.files as any;
        const { user_id } = req as any;
        console.log(image)
        const avatarService = new AvatarService();
        const avatar = await avatarService.create({ file: image, user_id });
        return res.json(avatar);
    }

    async update(req: Request, res: Response) {
        const { image } = req.files as any;
        const { id } = req.params;
        console.log(image)
        const avatarService = new AvatarService();
        const avatar = await avatarService.update({ file: image, id });
        return res.json(avatar);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const avatarService = new AvatarService();
        const avatar = await avatarService.delete(id);
        return response.json(avatar);
    }
}