import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const authController = new AuthController();


export const authRouter = (router: Router) => {
    /**
     * POST /api/login
     * @summary Login to get token access
     * @tags Auth
     * @param {LoginRequest} request.body.required
     * @return {LoginResponse} 200 - success response - application/json
     */
    router.post("/login", authController.login);
} 
