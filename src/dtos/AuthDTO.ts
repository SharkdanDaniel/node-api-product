import { UserDTO } from "./UserDTO";

export interface LoginRequestDTO {
    email: string;
    password: string;    
}

export interface LoginResponseDTO {
    token: string;
    profile: UserDTO;
}
