import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
    async getAll(request: Request, response: Response) {
        const { skip, take, order, sort, search } = request.query;
        const userService = new UserService();
        const users = await userService.getAll(skip, take, order, sort, search);
        return response.json(users);
    }

    async getById(request: Request, response: Response) {
        const { id } = request.params;
        const userService = new UserService();
        const user = await userService.getById(id);
        return response.json(user);
    }

    async create(request: Request, response: Response) {
        const { name, email, admin, password } = request.body;
        const userService = new UserService();
        const user = await userService.create({ name, email, admin, password });
        return response.json(user);
    }

    async update(request: Request, response: Response) {
        const { id, name, email, admin, password, products } = request.body;
        const userService = new UserService();
        const user = await userService.update({ id, name, email, admin, password, products });
        return response.json(user);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const userService = new UserService();
        const user = await userService.delete(id);
        console.log(user);
        return response.json(user);
    }
}