import { Avatar } from "../entities/Avatar";
import { Product } from "../entities/Product";
import { DataListDTO } from "./DataListDTO";


export interface UserModel {
    id: string;
    name: string;    
    email: string;    
    admin: boolean;
}

export interface UserDTO {
    id: string;
    name: string;    
    email: string;    
    admin: boolean;
    avatar?: Avatar;
    products?: Product[];
}

export interface UserCreateDTO {
    name: string;    
    email: string;    
    password: string;
    admin: boolean;
    avatar?: Avatar;
    products?: Product[];
}

export interface UserUpdateDTO {
    id: string;
    name: string;    
    email: string;    
    password: string;
    admin: boolean;
    avatar?: Avatar;
    products?: Product[];
}

export interface UserListDTO extends DataListDTO<UserModel> {}
