import { DataListDTO } from "./DataListDTO";
import { TagModel } from "./TagDTO";
import { UserModel } from "./UserDTO";

 export interface ProductModel {
    id: string;
    name: string;
    price: number;
    description: string;
}

export interface ProductDTO {
    id: string;
    name: string;
    price: number;
    description: string;
    users: UserModel[];
    tags: TagModel[];
}


export interface ProductCreateDTO {
    name: string;
    price: number;
    description: string;
}

export interface ProductUpdateDTO {
    id: string;
    name: string;
    price: number;
    description: string;
    users: UserModel[];
    tags: TagModel[];  
}

export interface ProductListDTO extends DataListDTO<ProductModel> {}
