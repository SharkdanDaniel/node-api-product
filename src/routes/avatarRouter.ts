import { Router } from "express";
import { AvatarController } from "../controllers/AvatarController";
import { TagController } from "../controllers/TagController";
import { ensureAuth } from "../middlewares/ensureAuth";

const avatarController = new AvatarController();

export const avatarRouter = (router: Router) => {    
    /**
     * GET /api/avatars/{avatarId}
     * @summary Get an Avatar
     * @tags Avatars
     * @security BearerAuth
     * @param {string} avatarId.path.required - avatar id - uuid
     * @return {AvatarModel} 200 - success response - application/json
     */
    router.get("/avatars/:id", ensureAuth, avatarController.getById);
    /**
     * POST /api/avatars
     * @summary Create an Avatar
     * @tags Avatars
     * @security BearerAuth
     * @param {AvatarCreate} request.body.required - image file - multipart/form-data
     * @return {AvatarModel} 200 - success response - application/json
     */
    router.post("/avatars", ensureAuth, avatarController.create);
    /**
     * PUT /api/avatars/{avatarId}
     * @summary Update an Avatar
     * @tags Avatars
     * @security BearerAuth
     * @param {string} avatarId.path.required - avatar id - uuid
     * @param {AvatarCreate} request.body.required - image file - multipart/form-data
     * @return {AvatarModel} 200 - success response - application/json
     */
    router.put("/avatars/:id", ensureAuth, avatarController.update);
    /**
     * DELETE /api/avatars/{avatarId}
     * @summary Delete an Avatar
     * @tags Avatars
     * @security BearerAuth
     * @param {string} avatarId.path.required - avatar id - uuid
     * @return {boolean} 200 - success response - application/json
     */
     router.delete("/avatars/:id", ensureAuth, avatarController.delete);  
} 
