import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ensureAuth } from "../middlewares/ensureAuth";

const userController = new UserController();

export const userRouter = (router: Router) => {
    /**
     * GET /api/users
     * @summary Get user list
     * @tags Users
     * @security BearerAuth
     * @param {string} skip.query - Skip items - default: 0
     * @param {string} take.query - Take total items - default: 10
     * @param {string} order.query - Order by property name - default: name
     * @param {string} sort.query - ASC or DESC order - default: ASC
     * @param {string} search.query - Terms to filter items
     * @return {UserList} 200 - success response - application/json
     
     */
    router.get("/users", ensureAuth, userController.getAll);
    /**
     * GET /api/users/{userId}
     * @summary Login to get token access
     * @tags Users
     * @security BearerAuth
     * @param {string} userId.path.required - user id - uuid
     * @return {UserModel} 200 - success response - application/json
     */
    router.get("/users/:id", ensureAuth, userController.getById);
    /**
     * POST /api/users
     * @summary Create a user
     * @tags Users
     * @security BearerAuth
     * @param {UserCreate} request.body.required
     * @return {UserDTO} 200 - success response - application/json
     */
    router.post("/users", ensureAuth, userController.create);
    /**
     * PUT /api/users
     * @summary Update a user
     * @tags Users
     * @security BearerAuth
     * @param {UserUpdate} request.body.required
     * @return {UserModel} 200 - success response - application/json
     */
    router.put("/users", ensureAuth, userController.update);
    /**
     * DELETE /api/users/{userId}
     * @summary Delete a user
     * @tags Users
     * @security BearerAuth
     * @param {string} userId.path.required - user id - uuid
     * @return {boolean} 200 - success response - application/json
     */
    router.delete("/users/:id", ensureAuth, userController.delete);
} 
