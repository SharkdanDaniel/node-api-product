import { Request, Response } from "express";
import { TagService } from "../services/TagService";

export class TagController {
    async getAll(request: Request, response: Response) {
        const { skip, take, order, sort, search } = request.query;
        const tagService = new TagService();
        const tags = await tagService.getAll(skip, take, order, sort, search);
        return response.json(tags);
    }

    async getById(request: Request, response: Response) {
        const { id } = request.params;
        const tagService = new TagService();
        const tag = await tagService.getById(id);
        return response.json(tag);
    }

    async create(request: Request, response: Response) {
        const { name } = request.body;
        const tagService = new TagService();
        const tag = await tagService.create({ name });
        return response.json(tag);
    }

    async update(request: Request, response: Response) {
        const { id, name } = request.body;
        const tagService = new TagService();
        const tag = await tagService.update({ id, name });
        return response.json(tag);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const tagService = new TagService();
        const tag = await tagService.delete(id);
        return response.json(tag);
    }
}