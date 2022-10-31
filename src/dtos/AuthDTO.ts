import { UserDTO } from "./UserDTO";

/**
 * A login request
 * @typedef {object} LoginRequestDTO
 * @property {string} email - email info - email
 * @property {string} password
 */
export interface LoginRequestDTO {
    email: string;
    password: string;    
}

/**
 * A login response
 * @typedef {object} LoginResponseDTO
 * @property {string} token
 * @property {UserDTO} profile
 */
export interface LoginResponseDTO {
    token: string;
    profile: UserDTO;
}
