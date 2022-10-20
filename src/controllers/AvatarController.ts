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

    // async update(request: Request, response: Response) {
    //     const { id, name } = request.body;
    //     const tagService = new TagService();
    //     const tag = await tagService.update({ id, name });
    //     return response.json(tag);
    // }

    // async delete(request: Request, response: Response) {
    //     const { id } = request.params;
    //     const tagService = new TagService();
    //     const tag = await tagService.delete(id);
    //     return response.json(tag);
    // }
}