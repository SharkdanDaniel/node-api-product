import { Avatar } from "../entities/Avatar";
import { Product } from "../entities/Product";
import { UserModel } from "./UserDTO";

/**
 * A avatar type
 * @typedef {object} AvatarDTO
 * @property {string} id - user id - uuid
 * @property {string} fileName
 * @property {string} mediaType - user email - email 
 * @property {string} src
 * @property {UserModel} user
 */
export interface AvatarDTO {
    id: string;
    fileName: string;
    mediaType: string;
    src: string;
    user: UserModel;
}

/**
 * A avatar type
 * @typedef {object} AvatarCreateDTO
 * @property {string} image - image file - binary
 */
export interface AvatarCreateDTO {
    image: File;
}
