import { ProductDTO, ProductModel } from "../dtos/ProductDTO";
import { Product } from "../entities/Product";
import { TagMapper } from "./TagMapper";
import { UserMapper } from "./UserMapper";

export class ProdcutMapper {

    static toModel(product: Product) {
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
        } as ProductModel
    }

    static toDTO(product: Product) {
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            tags: TagMapper.toListDTO(product.tags || []),
            users: UserMapper.toListDTO(product.users || []),
        } as ProductDTO
    }

    static toListDTO(products: Product[]) {
        return products.map((product) => {
            return {
                id: product.id,
                name: product.name,
                price: product.price,
                description: product.description,
            } as ProductModel
        })
    }
}