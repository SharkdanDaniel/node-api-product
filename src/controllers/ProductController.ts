import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";

export class ProductController {
    async getAll(request: Request, response: Response) {
        const { skip, take, order, sort, search } = request.query;
        const productService = new ProductService();
        const products = await productService.getAll(skip, take, order, sort, search);
        return response.json(products);
    }

    async getById(request: Request, response: Response) {
        const { id } = request.params;
        const productService = new ProductService();
        const product = await productService.getById(id);
        return response.json(product);
    }

    async create(request: Request, response: Response) {
        const { name, price, description } = request.body;
        const productsService = new ProductService();
        const product = await productsService.create({ name, price, description });
        return response.json(product);
    }

    async update(request: Request, response: Response) {
        const { id, name, price, description, users, tags } = request.body;
        const productService = new ProductService();
        const product = await productService.update({ id, name, price, description, users, tags });
        return response.json(product);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const productService = new ProductService();
        const product = await productService.delete(id);
        console.log(product);
        return response.json(product);
    }
}