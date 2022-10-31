import { Avatar } from "../entities/Avatar";
import { Product } from "../entities/Product";
import { UserModel } from "./UserDTO";

export interface AvatarDTO {
    id: string;
    fileName: string;
    mediaType: string;
    src: string;
    user: UserModel;
}

export interface AvatarCreateDTO {
    image: File;
}
