import { Product } from "../entities/Product";
import { User } from "../entities/User";
import { DataListDTO } from "./DataListDTO";
import { ProductModel } from "./ProductDTO";
import { UserModel } from "./UserDTO";

/**
 * A tag type
 * @typedef {object} TagModel
 * @property {string} id - tag id - uuid
 * @property {string} name 
 */

 export interface TagModel {
    id: string;
    name: string; 
}

/**
 * A tag type
 * @typedef {object} TagDTO
 * @property {string} id - tag id - uuid
 * @property {string} name
 * @property {ProductModel[]} products
 */
export interface TagDTO {
    id: string;
    name: string;    
    products: ProductModel[];
}

/**
 * A tag type
 * @typedef {object} TagCreateDTO
 * @property {string} name
 */
export interface TagCreateDTO {
    name: string;
}

/**
 * A tag type
 * @typedef {object} TagUpdateDTO
 * @property {string} id - tag id - uuid
 * @property {string} name
 * @property {UserModel} user
 */
export interface TagUpdateDTO {
    id: string;
    name: string;    
    user: UserModel;    
}

/**
 * A tag type
 * @typedef {object} TagListDTO
 * @property {array<TagModel>} data - tags items
 * @property {number} total - total in database
 */
export interface TagListDTO extends DataListDTO<TagModel> {}
