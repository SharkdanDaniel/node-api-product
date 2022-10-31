import { Avatar } from "../entities/Avatar";
import { Product } from "../entities/Product";
import { DataListDTO } from "./DataListDTO";

/**
 * A user type
 * @typedef {object} UserModel
 * @property {string} id - user id - uuid
 * @property {string} name
 * @property {string} email - user email - email
 * @property {boolean} admin
 */
export interface UserModel {
    id: string;
    name: string;    
    email: string;    
    admin: boolean;
}

/**
 * A user type
 * @typedef {object} UserDTO
 * @property {string} id - user id - uuid
 * @property {string} name
 * @property {string} email - user email - email
 * @property {boolean} admin
 * @property {Avatar} avatar
 * @property {Product[]} products
 */
export interface UserDTO {
    id: string;
    name: string;    
    email: string;    
    admin: boolean;
    avatar?: Avatar;
    products?: Product[];
}

/**
 * A user type
 * @typedef {object} UserCreateDTO
 * @property {string} name
 * @property {string} email - user email - email
 * @property {boolean} admin
 * @property {string} password
 */
export interface UserCreateDTO {
    name: string;    
    email: string;    
    password: string;
    admin: boolean;
    avatar?: Avatar;
    products?: Product[];
}

/**
 * A user type
 * @typedef {object} UserUpdateDTO
 * @property {string} id - user id - uuid
 * @property {string} name
 * @property {string} email - user email - email
 * @property {string} password
 * @property {boolean} admin
 * @property {array<ProductDTO>} products
 * @property {AvatarDTO} avatar
 */
export interface UserUpdateDTO {
    id: string;
    name: string;    
    email: string;    
    password: string;
    admin: boolean;
    avatar?: Avatar;
    products?: Product[];
}

/**
 * A user type
 * @typedef {object} UserListDTO
 * @property {array<UserModel>} data - user items
 * @property {number} total - total in database
 */
export interface UserListDTO extends DataListDTO<UserModel> {}
