import { DataListDTO } from "./DataListDTO";
import { ProductModel } from "./ProductDTO";
import { UserModel } from "./UserDTO";

 export interface TagModel {
    id: string;
    name: string; 
}

export interface TagDTO {
    id: string;
    name: string;    
    products: ProductModel[];
}

export interface TagCreateDTO {
    name: string;
}

export interface TagUpdateDTO {
    id: string;
    name: string;    
    user: UserModel;    
}

export interface TagListDTO extends DataListDTO<TagModel> {}
