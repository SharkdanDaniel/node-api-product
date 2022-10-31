import { AvatarDTO } from "../dtos/AvatarDTO";
import { UserDTO, UserModel } from "../dtos/UserDTO";
import { Avatar } from "../entities/Avatar";
import { User } from "../entities/User";
import { UserMapper } from "./UserMapper";

export class AvatarMapper {
    static toDTO(avatar: Avatar = {} as any) {
        return {
            id: avatar.id,
            fileName: avatar.fileName,
            mediaType: avatar.mediaType,
            src: avatar.src,
            user: UserMapper.toModel(avatar.user)
        } as AvatarDTO
    }
}