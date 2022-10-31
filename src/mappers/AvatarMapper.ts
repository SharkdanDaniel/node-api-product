import { AvatarDTO } from "../dtos/AvatarDTO";
import { Avatar } from "../entities/Avatar";
import { UserMapper } from "./UserMapper";

export class AvatarMapper {
    static toDTO(avatar: Avatar) {
        return avatar ? {
            id: avatar.id,
            fileName: avatar.fileName,
            mediaType: avatar.mediaType,
            src: avatar.src,
            user: UserMapper.toModel(avatar.user)
        } as AvatarDTO : null;
    }
}