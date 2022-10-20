import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
    async login(request: Request, response: Response) {
        const { email, password } = request.body;
        const authService = new AuthService();
        const auth = await authService.login({ email, password });
        return response.json(auth);
    }
}