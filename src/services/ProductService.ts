import { instanceToPlain } from "class-transformer";
import { Tag } from "../entities/Tag";
import { User } from "../entities/User";
import { ProdcutMapper } from "../mappers/ProductMapper";
import { ProductsRepositories } from "../repositories/ProductsRepositories";

interface IProductRequest {
    id?: string;
    name: string;
    price: number;
    description: string;
    tags?: Tag[];
    users?: User[];

}

export class ProductService {
    async getAll(skip: any = 0, take: any = 10, order: any = 'name', sort: any = 'asc', search: any = '') {
        const productsRepositories = ProductsRepositories;
        try {
            const products = await productsRepositories.createQueryBuilder()
                .skip(skip)
                .take(take)
                .orderBy({ [order]: sort })
                .where('name LIKE :name', { name: `%${search}%` })
                .orWhere('price LIKE :price', { price: `%${search}%` })
                .orWhere('description LIKE :description', { description: `%${search}%` })
                .getMany()

            const total = await productsRepositories.createQueryBuilder()
                .orderBy({ [order]: sort })
                .where('name LIKE :name', { name: `%${search}%` })
                .orWhere('price LIKE :price', { price: `%${search}%` })
                .orWhere('description LIKE :description', { description: `%${search}%` })
                .getCount()
            
            return { data: ProdcutMapper.toListDTO(products), total };

        } catch (error: any) {
            throw new Error(error);
        }
    }

    async getById(id: string) {
        const productsRepositories = ProductsRepositories;
        const product = await productsRepositories.findOne({ where: { id }, relations: { tags: true, users: true } });
        if(product) return ProdcutMapper.toDTO(product);
        throw { status: 404, message: "Product not found" };
    }

    async create({ name, price, description }: IProductRequest) {
        const productsRepositories = ProductsRepositories;
        const product = productsRepositories.create({ name, price, description });
        await productsRepositories.save(product);
        return ProdcutMapper.toModel(product);
    }

    async update({ id, name, price, description, users, tags }: IProductRequest) {
        const productsRepositories = ProductsRepositories;
        let product = await productsRepositories.findOneBy({ id });
        if (product) {
            product.name = name;
            product.price = price;
            product.description = description;
            product.updatedAt = new Date();
            if(users) product.users = users;  
            if(tags) product.tags = tags;  
            await productsRepositories.save(product);
            return ProdcutMapper.toDTO(product);
        }
        throw ({ status: 404, message: 'Product not found' });
    }

    async delete(id: string) {
        const productsRepositories = ProductsRepositories;
        const { affected } = await productsRepositories.delete({ id });
        if(affected && affected > 0) return true;
        throw { status: 404, message: "Product not found" };
    }
}