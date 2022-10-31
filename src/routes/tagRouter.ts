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
     * @param {string} skip.query - Skip items - default: 0
     * @param {string} take.query - Take total items - default: 10
     * @param {string} order.query - Order by property name - default: name
     * @param {string} sort.query - ASC or DESC order - default: ASC
     * @param {string} search.query - Terms to filter items
     * @return {TagListDTO} 200 - success response - application/json
     
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
     * @param {TagCreateDTO} request.body.required
     * @return {TagModel} 200 - success response - application/json
     */
    router.post("/tags", ensureAuth, tagController.create);
    /**
     * PUT /api/tags
     * @summary Update a Tag
     * @tags Tags
     * @security BearerAuth
     * @param {TagUpdateDTO} request.body.required
     * @return {TagDTO} 200 - success response - application/json
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
