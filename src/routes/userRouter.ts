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
     * @return {UserListDTO} 200 - success response - application/json
     
     */
    router.get("/users", ensureAuth, userController.getAll);
    /**
     * GET /api/users/{userId}
     * @summary Get an user
     * @tags Users
     * @security BearerAuth
     * @param {string} userId.path.required - user id - uuid
     * @return {UserDTO} 200 - success response - application/json
     */
    router.get("/users/:id", ensureAuth, userController.getById);
    /**
     * POST /api/users
     * @summary Create an user
     * @tags Users
     * @security BearerAuth
     * @param {UserCreateDTO} request.body.required
     * @return {UserModel} 200 - success response - application/json
     */
    router.post("/users", ensureAuth, userController.create);
    /**
     * PUT /api/users
     * @summary Update an user
     * @tags Users
     * @security BearerAuth
     * @param {UserUpdateDTO} request.body.required
     * @return {UserDTO} 200 - success response - application/json
     */
    router.put("/users", ensureAuth, userController.update);
    /**
     * DELETE /api/users/{userId}
     * @summary Delete an user
     * @tags Users
     * @security BearerAuth
     * @param {string} userId.path.required - user id - uuid
     * @return {boolean} 200 - success response - application/json
     */
    router.delete("/users/:id", ensureAuth, userController.delete);
} 
