import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import { ensureAuth } from "../middlewares/ensureAuth";

const productController = new ProductController();

export const productRouter = (router: Router) => {
    /**
     * GET /api/products
     * @summary Get product list
     * @tags Products
     * @security BearerAuth
     * @return {ProductList} 200 - success response - application/json
     
     */
    router.get("/products", ensureAuth, productController.getAll);
    /**
     * GET /api/products/{productId}
     * @summary Get a product
     * @tags Products
     * @security BearerAuth
     * @param {string} productId.path.required - product id - uuid
     * @return {ProductModel} 200 - success response - application/json
     */
    router.get("/products/:id", ensureAuth, productController.getById);
    /**
     * POST /api/products
     * @summary Create a product
     * @tags Products
     * @security BearerAuth
     * @param {ProductDTO} request.body.required
     * @return {ProductDTO} 200 - success response - application/json
     */
    router.post("/products", ensureAuth, productController.create);
    /**
     * PUT /api/products
     * @summary Update a product
     * @tags Products
     * @security BearerAuth
     * @param {ProductModel} request.body.required
     * @return {ProductModel} 200 - success response - application/json
     */
    router.put("/products", ensureAuth, productController.update);
    /**
     * DELETE /api/products/{productId}
     * @summary Delete a product
     * @tags Products
     * @security BearerAuth
     * @param {string} productId.path.required - product id - uuid
     * @return {boolean} 200 - success response - application/json
     */
    router.delete("/products/:id", ensureAuth, productController.delete);
} 
