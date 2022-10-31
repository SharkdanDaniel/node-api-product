import { Product } from "../entities/Product";
import { User } from "../entities/User";
import { DataListDTO } from "./DataListDTO";
import { TagDTO, TagModel } from "./TagDTO";
import { UserDTO, UserModel } from "./UserDTO";

/**
 * A product type
 * @typedef {object} ProductModel
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {string} description
 */
 export interface ProductModel {
    id: string;
    name: string;
    price: number;
    description: string;
}

/**
 * A product type
 * @typedef {object} ProductDTO
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {string} description
 * @property {array<UserModel>} users
 * @property {array<TagModel>} tags
 */
export interface ProductDTO {
    id: string;
    name: string;
    price: number;
    description: string;
    users: UserModel[];
    tags: TagModel[];
}

/**
 * A product type
 * @typedef {object} ProductCreateDTO
 * @property {string} name
 * @property {number} price
 * @property {string} description
 */
export interface ProductCreateDTO {
    name: string;
    price: number;
    description: string;
}

/**
 * A product type
 * @typedef {object} ProductUpdateDTO
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {string} description
 * @property {array<UserModel>} users
 * @property {array<TagModel>} tags
 */
export interface ProductUpdateDTO {
    id: string;
    name: string;
    price: number;
    description: string;
    users: UserModel[];
    tags: TagModel[];  
}

/**
 * A product type
 * @typedef {object} ProductListDTO
 * @property {array<ProductModel>} data - product items
 * @property {number} total - total in database
 */
export interface ProductListDTO extends DataListDTO<ProductModel> {}
