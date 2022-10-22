import { Router } from "express";
import { TagController } from "../controllers/TagController";
import { ensureAuth } from "../middlewares/ensureAuth";

const tagController = new TagController();

export const tagRouter = (router: Router) => {
    /**
     * GET /api/tags
     * @summary Get tag list
     * @tags Tags
     * @security BearerAuth
     * @return {TagList} 200 - success response - application/json
     
     */
    router.get("/tags", ensureAuth, tagController.getAll);
    /**
     * GET /api/tags/{tagId}
     * @summary Get a tag
     * @tags Tags
     * @security BearerAuth
     * @param {string} tagId.path.required - tag id - uuid
     * @return {TagModel} 200 - success response - application/json
     */
    router.get("/tags/:id", ensureAuth, tagController.getById);
    /**
     * POST /api/tags
     * @summary Create a Tag
     * @tags Tags
     * @security BearerAuth
     * @param {TagDTO} request.body.required
     * @return {TagDTO} 200 - success response - application/json
     */
    router.post("/tags", ensureAuth, tagController.create);
    /**
     * PUT /api/tags
     * @summary Update a Tag
     * @tags Tags
     * @security BearerAuth
     * @param {TagModel} request.body.required
     * @return {TagModel} 200 - success response - application/json
     */
    router.put("/tags", ensureAuth, tagController.update);
    /**
     * DELETE /api/tags/{tagId}
     * @summary Delete a tag
     * @tags Tags
     * @security BearerAuth
     * @param {string} tagId.path.required - tag id - uuid
     * @return {boolean} 200 - success response - application/json
     */
    router.delete("/tags/:id", ensureAuth, tagController.delete);
} 
